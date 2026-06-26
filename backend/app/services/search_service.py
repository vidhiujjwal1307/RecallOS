from sqlalchemy.orm import Session
from app.models.memory import Memory


def search_memories(query: str, db: Session):
    return db.query(Memory).filter(
        Memory.title.ilike(f"%{query}%") |
        Memory.content.ilike(f"%{query}%") |
        Memory.category.ilike(f"%{query}%")
    ).all()