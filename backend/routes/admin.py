from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc
from database import get_db
from models import Contact
from schemas import ContactOut, AdminReply
from config import ADMIN_LOGIN, ADMIN_PASSWORD

router = APIRouter(prefix="/api/admin", tags=["admin"])


def verify_admin(login: str = Query(...), password: str = Query(...)):
    """Простая проверка логина/пароля через query-параметры."""
    if login != ADMIN_LOGIN or password != ADMIN_PASSWORD:
        raise HTTPException(status_code=403, detail="Доступ запрещён")
    return True


@router.get("/contacts", response_model=list[ContactOut])
async def get_contacts(
    _: bool = Depends(verify_admin),
    status: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    """Список обращений (фильтр по статусу)."""
    query = select(Contact).order_by(desc(Contact.created_at))
    if status:
        query = query.where(Contact.status == status)
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/contacts/{contact_id}", response_model=ContactOut)
async def get_contact(
    contact_id: int,
    _: bool = Depends(verify_admin),
    db: AsyncSession = Depends(get_db),
):
    """Детали обращения."""
    result = await db.execute(select(Contact).where(Contact.id == contact_id))
    contact = result.scalar_one_or_none()
    if not contact:
        raise HTTPException(status_code=404, detail="Обращение не найдено")
    return contact


@router.post("/contacts/{contact_id}/read")
async def mark_read(
    contact_id: int,
    _: bool = Depends(verify_admin),
    db: AsyncSession = Depends(get_db),
):
    """Пометить как прочитанное."""
    result = await db.execute(select(Contact).where(Contact.id == contact_id))
    contact = result.scalar_one_or_none()
    if not contact:
        raise HTTPException(status_code=404, detail="Обращение не найдено")
    contact.status = "read"
    await db.commit()
    return {"ok": True}


@router.post("/contacts/{contact_id}/reply")
async def reply_contact(
    contact_id: int,
    data: AdminReply,
    _: bool = Depends(verify_admin),
    db: AsyncSession = Depends(get_db),
):
    """Сохранить ответ администратора."""
    result = await db.execute(select(Contact).where(Contact.id == contact_id))
    contact = result.scalar_one_or_none()
    if not contact:
        raise HTTPException(status_code=404, detail="Обращение не найдено")
    contact.admin_reply = data.reply
    contact.status = "replied"
    contact.replied_at = datetime.utcnow()
    await db.commit()
    return {"ok": True, "message": "Ответ сохранён"}


@router.delete("/contacts/{contact_id}")
async def delete_contact(
    contact_id: int,
    _: bool = Depends(verify_admin),
    db: AsyncSession = Depends(get_db),
):
    """Удалить обращение."""
    result = await db.execute(select(Contact).where(Contact.id == contact_id))
    contact = result.scalar_one_or_none()
    if not contact:
        raise HTTPException(status_code=404, detail="Обращение не найдено")
    await db.delete(contact)
    await db.commit()
    return {"ok": True}


@router.get("/stats")
async def get_stats(
    _: bool = Depends(verify_admin),
    db: AsyncSession = Depends(get_db),
):
    """Статистика обращений."""
    total = await db.execute(select(func.count(Contact.id)))
    new = await db.execute(select(func.count(Contact.id)).where(Contact.status == "new"))
    read = await db.execute(select(func.count(Contact.id)).where(Contact.status == "read"))
    replied = await db.execute(select(func.count(Contact.id)).where(Contact.status == "replied"))
    return {
        "total": total.scalar(),
        "new": new.scalar(),
        "read": read.scalar(),
        "replied": replied.scalar(),
    }
