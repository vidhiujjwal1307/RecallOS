from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.memory import Memory as MemoryModel
from app.schemas.memory import Memory

router = APIRouter()

# Database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/capture")
def capture(memory: Memory, db: Session = Depends(get_db)):
    new_memory = MemoryModel(
        title=memory.title,
        content=memory.content,
        url=memory.url,
        category=memory.category,
        timestamp=memory.timestamp
    )

    db.add(new_memory)
    db.commit()
    db.refresh(new_memory)

    return {
        "message": "Memory Saved Successfully"
    }


@router.get("/memories")
def get_memories(db: Session = Depends(get_db)):
    return db.query(MemoryModel).all()