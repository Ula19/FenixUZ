from datetime import datetime
from pydantic import BaseModel, EmailStr


# --- Запрос от пользователя ---
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    message: str


# --- Ответ API ---
class ContactOut(BaseModel):
    id: int
    name: str
    email: str
    message: str
    status: str
    admin_reply: str | None
    created_at: datetime
    replied_at: datetime | None

    class Config:
        from_attributes = True


# --- Ответ администратора ---
class AdminReply(BaseModel):
    reply: str
