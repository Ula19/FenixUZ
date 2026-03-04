from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from database import init_db
from routes.contacts import router as contacts_router
from routes.admin import router as admin_router
from config import RECAPTCHA_SITE_KEY


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(title="FenixUz API", version="1.0.0", lifespan=lifespan)

# CORS — разрешаем запросы с фронтенда
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Роуты
app.include_router(contacts_router)
app.include_router(admin_router)

# Админ-панель (статический HTML)
app.mount("/admin-static", StaticFiles(directory="admin"), name="admin-static")


@app.get("/admin")
async def admin_page():
    return FileResponse("admin/index.html")


@app.get("/api/health")
async def health():
    return {"status": "ok"}


@app.get("/api/recaptcha-key")
async def recaptcha_key():
    return {"site_key": RECAPTCHA_SITE_KEY}
