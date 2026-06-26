from sqlalchemy.orm import Session
from datetime import date

from app.models.memory import Memory


def get_today_memories(db: Session):

    today = str(date.today())

    memories = (
        db.query(Memory)
        .filter(Memory.timestamp.contains(today))
        .all()
    )

    result = []

    for memory in memories:
        result.append({
            "id": memory.id,
            "title": memory.title,
            "content": memory.content,
            "category": memory.category,
            "timestamp": memory.timestamp
        })

    return result