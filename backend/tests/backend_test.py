import os
from pathlib import Path

import pytest
import requests
from dotenv import dotenv_values

frontend_env = dotenv_values("/app/frontend/.env")
base_url = os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL")
if not base_url:
    raise RuntimeError("REACT_APP_BACKEND_URL missing")
BASE_URL = base_url.rstrip("/")


@pytest.fixture(scope="module")
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Root/health
class TestRoot:
    def test_root(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        assert r.json().get("message") == "Amber Cove API"


# Contact CRUD
class TestContact:
    created_ids = []

    def test_create_contact_valid(self, api_client):
        payload = {
            "name": "TEST_Jane Doe",
            "email": "TEST_jane@example.com",
            "phone": "555-1234",
            "service": "Outdoor Kitchen",
            "message": "TEST_Please contact me about a design.",
        }
        r = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["phone"] == payload["phone"]
        assert data["service"] == payload["service"]
        assert data["message"] == payload["message"]
        assert "created_at" in data
        TestContact.created_ids.append(data["id"])

    def test_list_contacts_contains_created(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/contact")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) > 0
        # Created record should be present
        ids = [d["id"] for d in data]
        assert TestContact.created_ids[-1] in ids
        # created_at desc verification
        created_ats = [d["created_at"] for d in data if d.get("created_at")]
        assert created_ats == sorted(created_ats, reverse=True)

    def test_create_contact_missing_fields(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/contact", json={"name": "x"})
        assert r.status_code == 422

    def test_create_contact_invalid_email(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_x", "email": "not-an-email", "message": "hi"
        })
        assert r.status_code == 422

    def test_create_contact_optional_fields_default(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_Optional",
            "email": "TEST_opt@example.com",
            "message": "TEST_no phone or service",
        })
        assert r.status_code == 200
        d = r.json()
        assert d["phone"] == ""
        assert d["service"] == ""
        TestContact.created_ids.append(d["id"])


@pytest.fixture(scope="module", autouse=True)
def cleanup():
    yield
    # Cleanup via direct mongo since no delete API
    try:
        from pymongo import MongoClient
        backend_env = dotenv_values("/app/backend/.env")
        mc = MongoClient(backend_env["MONGO_URL"].strip('"'))
        mc[backend_env["DB_NAME"].strip('"')].contacts.delete_many({"name": {"$regex": "^TEST_"}})
    except Exception as e:
        print(f"cleanup skipped: {e}")
