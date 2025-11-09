# Backend notes — migrations and local commands

This file explains how to run Alembic migrations and common backend maintenance tasks.

Run migrations (from project root, using docker-compose):

```bash
# Run alembic inside the `backend` service. The alembic directory is `backend/alembic`.
docker compose exec backend sh -c "cd backend && alembic -c alembic.ini upgrade head"
```

If you prefer to run migrations locally (ensure dependencies from `backend/requirements.txt` are installed):

```bash
cd backend
# set DATABASE_URL, e.g. export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/notes_db
alembic -c alembic.ini upgrade head
```

To create a new revision after changing models:

```bash
cd backend
alembic -c alembic.ini revision -m "describe change" --autogenerate
```

Notes:
- `alembic.ini` and `alembic/env.py` are configured to read `DATABASE_URL` from the environment when present.
- The repository includes an initial migration `backend/alembic/versions/0001_add_user_id.py` that adds `user_id` to `notes`.
