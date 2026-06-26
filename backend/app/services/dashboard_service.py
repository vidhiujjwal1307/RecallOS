from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date

from app.models.memory import Memory


def get_dashboard(db: Session):

    total = db.query(Memory).count()

    today = str(date.today())

    today_count = (
        db.query(Memory)
        .filter(Memory.timestamp.contains(today))
        .count()
    )

    recent_memories = (
        db.query(Memory)
        .order_by(Memory.id.desc())
        .limit(5)
        .all()
    )

    recent = []

    for memory in recent_memories:
        recent.append({
            "id": memory.id,
            "title": memory.title,
            "content": memory.content,
            "url": memory.url,
            "category": memory.category,
            "timestamp": memory.timestamp
        })

    category_data = (
        db.query(
            Memory.category,
            func.count(Memory.id)
        )
        .group_by(Memory.category)
        .all()
    )

    categories = []

    for category, count in category_data:
        categories.append({
            "category": category,
            "count": count
        })

    return {
        "total_memories": total,
        "today_memories": today_count,
        "recent": recent,
        "categories": categories
    }