from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email (Emergent managed Resend proxy)
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
OWNER_EMAIL = os.environ["OWNER_EMAIL"]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ── Models ──
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    service: Optional[str] = ""
    message: str


class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str = ""
    service: str = ""
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


def _inquiry_email_html(c: Contact) -> str:
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:32px 0;font-family:Arial,sans-serif;">
      <tr><td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#141414;border:1px solid rgba(200,150,62,0.3);border-radius:4px;overflow:hidden;">
          <tr><td style="background:#C8963E;padding:20px 32px;">
            <span style="font-size:20px;letter-spacing:3px;color:#0A0A0A;font-weight:bold;">AMBER COVE</span>
          </td></tr>
          <tr><td style="padding:32px;">
            <p style="color:#C8963E;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px;">New Project Inquiry</p>
            <h2 style="color:#ffffff;font-size:22px;margin:0 0 24px;">{c.name}</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="color:#e5e5e5;font-size:14px;line-height:1.8;">
              <tr><td style="color:#888;width:120px;">Email</td><td>{c.email}</td></tr>
              <tr><td style="color:#888;">Phone</td><td>{c.phone or '—'}</td></tr>
              <tr><td style="color:#888;">Service</td><td>{c.service or '—'}</td></tr>
            </table>
            <p style="color:#888;font-size:12px;letter-spacing:1px;text-transform:uppercase;margin:24px 0 8px;">Message</p>
            <p style="color:#e5e5e5;font-size:15px;line-height:1.7;margin:0;background:#0A0A0A;padding:18px;border-radius:4px;border-left:2px solid #C8963E;">{c.message}</p>
          </td></tr>
          <tr><td style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.08);color:#666;font-size:12px;">
            Received {c.created_at[:16].replace('T',' ')} UTC · Amber Cove Outdoor Living
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


async def _send_owner_email(c: Contact):
    payload = {
        "to": [OWNER_EMAIL],
        "subject": f"New Inquiry — {c.name} ({c.service or 'General'})",
        "html": _inquiry_email_html(c),
        "from_name": EMAIL_FROM_NAME,
        "contact_email": c.email,
    }
    try:
        async with httpx.AsyncClient(timeout=30) as hc:
            resp = await hc.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
    except Exception as e:
        logger.error(f"Inquiry email send failed: {e}")


# ── Routes ──
@api_router.get("/")
async def root():
    return {"message": "Amber Cove API"}


@api_router.post("/contact", response_model=Contact)
async def create_contact(payload: ContactCreate):
    contact = Contact(**payload.model_dump())
    await db.contacts.insert_one(contact.model_dump())
    await _send_owner_email(contact)
    return contact


@api_router.get("/contact", response_model=List[Contact])
async def list_contacts():
    docs = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
