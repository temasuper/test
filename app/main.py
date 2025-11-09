from fastapi import FastAPI
from .routers import user
from .database import engine, Base
from .models import database_models  # Импортируем модели, чтобы они были доступны для создания таблиц

# Создаем таблицы в базе данных
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="User Management API",
    description="API для управления пользователями с использованием FastAPI",
    version="1.0.0"
)

# Подключаем роутер
app.include_router(user.router)

@app.get("/")
async def root():
    return {"message": "Добро пожаловать в API управления пользователями"}