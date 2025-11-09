from sqlalchemy.orm import Session
from typing import List, Optional
from ..models.user import UserCreate, User
from ..models.database_models import UserDB

class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_user(self, user_id: int) -> Optional[User]:
        db_user = self.db.query(UserDB).filter(UserDB.id == user_id).first()
        if db_user:
            return User.from_orm(db_user)
        return None

    def get_user_by_email(self, email: str) -> Optional[User]:
        db_user = self.db.query(UserDB).filter(UserDB.email == email).first()
        if db_user:
            return User.from_orm(db_user)
        return None

    def get_users(self, skip: int = 0, limit: int = 100) -> List[User]:
        db_users = self.db.query(UserDB).offset(skip).limit(limit).all()
        return [User.from_orm(user) for user in db_users]

    def create_user(self, user: UserCreate) -> User:
        db_user = UserDB(
            email=user.email,
            username=user.username,
            password=user.password  # В реальном приложении пароль нужно хешировать!
        )
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return User.from_orm(db_user)