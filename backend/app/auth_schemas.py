from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    sub: Optional[str] = None
    exp: Optional[datetime] = None

class UserInfo(BaseModel):
    id: str
    email: str
    name: str