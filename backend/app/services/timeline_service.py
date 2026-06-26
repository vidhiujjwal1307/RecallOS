from sqlalchemy.orm import Session

from app.models.memory import Memory


def get_timeline(db: Session):

    memories = (
        db.query(Memory)
        .order_by(Memory.timestamp.desc())
        .all()
    )

    timeline = []

    for memory in memories:
        timeline.append({
            "id": memory.id,
            "title": memory.title,
            "content": memory.content,
            "category": memory.category,
            "timestamp": memory.timestamp
        })

    return timeline