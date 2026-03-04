import httpx
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db
from models import Contact
from schemas import ContactCreate
from config import RECAPTCHA_SECRET_KEY

router = APIRouter(prefix="/api/contacts", tags=["contacts"])

RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify"


async def verify_captcha(token: str) -> float:
    """Проверить токен reCAPTCHA v3, вернуть score."""
    async with httpx.AsyncClient() as client:
        resp = await client.post(RECAPTCHA_VERIFY_URL, data={
            "secret": RECAPTCHA_SECRET_KEY,
            "response": token,
        })
        result = resp.json()

    if not result.get("success"):
        raise HTTPException(status_code=400, detail="reCAPTCHA verification failed")

    return result.get("score", 0.0)


@router.post("/", status_code=201)
async def create_contact(data: ContactCreate, db: AsyncSession = Depends(get_db)):
    """Публичный эндпоинт — создать обращение (с проверкой reCAPTCHA)."""
    # Проверка reCAPTCHA
    score = await verify_captcha(data.captcha_token)
    if score < 0.5:
        raise HTTPException(status_code=403, detail="Подозрение на бота")

    contact = Contact(
        name=data.name.strip(),
        email=data.email.strip(),
        message=data.message.strip(),
    )
    db.add(contact)
    await db.commit()
    return {"ok": True, "message": "Ваше обращение отправлено!"}
