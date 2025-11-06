from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class NoteBase(BaseModel):
    title: str
    content: str

class NoteCreate(NoteBase):
    pass

class Note(NoteBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True