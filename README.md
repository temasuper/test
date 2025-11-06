# Приложение для заметок

Полноценное веб-приложение для создания, редактирования и управления заметками с использованием React, FastAPI и PostgreSQL в Docker.

## Технологии

### Frontend
- React
- TypeScript
- Axios
- CSS для стилизации

### Backend
- Python 3.11
- FastAPI
- SQLAlchemy
- PostgreSQL
- Docker

## Требования
- Docker
- Docker Compose

## Установка и запуск

### Запуск с помощью Docker Compose

1. Клонируйте репозиторий:
```bash
git clone https://github.com/temasuper/test.git
cd test
```

2. Запустите приложение с помощью Docker Compose:
```bash
docker-compose up --build
```

Это автоматически:
- Создаст и настроит базу данных PostgreSQL
- Запустит backend на FastAPI
- Соберет и запустит frontend

## Использование
После запуска, приложение будет доступно:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Swagger документация API: http://localhost:8000/docs

### Основные функции:
- Создание новых заметок
- Просмотр списка всех заметок
- Редактирование существующих заметок
- Удаление заметок

## Структура проекта
```
.
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── src/
│   │   ├── App.tsx
│   │   └── ...
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│       ├── main.py
│       ├── models.py
│       ├── schemas.py
│       └── database.py
```

## Разработка

### Запуск базы данных отдельно
```bash
docker-compose up db
```

### Запуск backend для разработки
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Запуск frontend для разработки
```bash
cd frontend
npm install
npm start
```

## Автор
* **temasuper**

## Лицензия
Этот проект лицензирован под MIT License - подробности см. в файле [LICENSE](LICENSE)