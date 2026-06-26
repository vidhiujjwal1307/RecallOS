from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.memory import Memory as MemoryModel
from app.services.search import search_memories
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
@router.get("/search")
def search(query: str, db: Session = Depends(get_db)):
    results = search_memories(query, db)
    return results
@router.delete("/memory/{memory_id}")
def delete_memory(memory_id: int, db: Session = Depends(get_db)):
    memory = db.query(MemoryModel).filter(MemoryModel.id == memory_id).first()

    if not memory:
        return {"message": "Memory not found"}

    db.delete(memory)
    db.commit()

    return {
        "message": "Memory Deleted Successfully"
    }