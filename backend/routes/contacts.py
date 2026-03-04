from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database import get_db
from models import Contact
from schemas import ContactCreate

router = APIRouter(prefix="/api/contacts", tags=["contacts"])


@router.post("/", status_code=201)
async def create_contact(data: ContactCreate, db: AsyncSession = Depends(get_db)):
    """Публичный эндпоинт — создать обращение."""
    contact = Contact(
        name=data.name.strip(),
        email=data.email.strip(),
        message=data.message.strip(),
    )
    db.add(contact)
    await db.commit()
    return {"ok": True, "message": "Ваше обращение отправлено!"}
