import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:postgres@localhost:5432/fenixuz")

ADMIN_LOGIN = os.getenv("ADMIN_LOGIN", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "patronus")

RECAPTCHA_SITE_KEY = os.getenv("RECAPTCHA_SITE_KEY", "6LfdP38sAAAAAL-3cz_lGnJpz9PSDiuQXIX5FdqW")
RECAPTCHA_SECRET_KEY = os.getenv("RECAPTCHA_SECRET_KEY", "6LfdP38sAAAAABl-ZP8yjY5kAYPgqC8LOFojh8Fl")
