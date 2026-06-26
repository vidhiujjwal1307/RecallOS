from fastapi import APIRouter, Depends, UploadFile, File
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from sqlalchemy import func
import json

from app.database import SessionLocal
from app.models.memory import Memory as MemoryModel
from app.schemas.memory import Memory
from app.services.search_service import search_memories
from app.services.dashboard_service import get_dashboard
from app.services.timeline_service import get_timeline
from app.services.today_service import get_today_memories

router = APIRouter()


# ---------------- DATABASE ----------------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------- CAPTURE ----------------

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

    return {"message": "Memory Saved Successfully"}


# ---------------- GET ALL MEMORIES ----------------

@router.get("/memories")
def get_memories(db: Session = Depends(get_db)):
    return db.query(MemoryModel).all()


# ---------------- SEARCH ----------------

@router.get("/search")
def search(query: str, db: Session = Depends(get_db)):
    return search_memories(query, db)


# ---------------- DELETE ----------------

@router.delete("/memory/{memory_id}")
def delete_memory(memory_id: int, db: Session = Depends(get_db)):

    memory = (
        db.query(MemoryModel)
        .filter(MemoryModel.id == memory_id)
        .first()
    )

    if not memory:
        return {"message": "Memory not found"}

    db.delete(memory)
    db.commit()

    return {"message": "Memory Deleted Successfully"}


# ---------------- UPDATE ----------------

@router.put("/memory/{memory_id}")
def update_memory(
    memory_id: int,
    memory: Memory,
    db: Session = Depends(get_db)
):

    old_memory = (
        db.query(MemoryModel)
        .filter(MemoryModel.id == memory_id)
        .first()
    )

    if not old_memory:
        return {"message": "Memory not found"}

    old_memory.title = memory.title
    old_memory.content = memory.content
    old_memory.url = memory.url
    old_memory.category = memory.category
    old_memory.timestamp = memory.timestamp

    db.commit()
    db.refresh(old_memory)

    return {
        "message": "Memory Updated Successfully",
        "memory": old_memory
    }


# ---------------- RECENT ----------------

@router.get("/recent")
def recent_memories(db: Session = Depends(get_db)):

    memories = (
        db.query(MemoryModel)
        .order_by(MemoryModel.id.desc())
        .limit(10)
        .all()
    )

    return memories


# ---------------- CATEGORIES ----------------

@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):

    result = (
        db.query(
            MemoryModel.category,
            func.count(MemoryModel.id)
        )
        .group_by(MemoryModel.category)
        .all()
    )

    return result


# ---------------- STATS ----------------

@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):

    total = db.query(MemoryModel).count()

    categories = (
        db.query(
            MemoryModel.category,
            func.count(MemoryModel.id)
        )
        .group_by(MemoryModel.category)
        .all()
    )

    latest = (
        db.query(MemoryModel)
        .order_by(MemoryModel.id.desc())
        .first()
    )

    return {
        "total_memories": total,
        "categories": categories,
        "latest_memory": latest
    }


# ---------------- EXPORT ----------------

@router.get("/export")
def export_memories(db: Session = Depends(get_db)):

    memories = db.query(MemoryModel).all()

    data = []

    for m in memories:
        data.append({
            "title": m.title,
            "content": m.content,
            "url": m.url,
            "category": m.category,
            "timestamp": m.timestamp
        })

    with open("memories.json", "w") as file:
        json.dump(data, file, indent=4)

    return FileResponse("memories.json")


# ---------------- IMPORT ----------------

@router.post("/import")
async def import_memories(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    data = json.loads(await file.read())

    for item in data:

        memory = MemoryModel(
            title=item["title"],
            content=item["content"],
            url=item["url"],
            category=item["category"],
            timestamp=item["timestamp"]
        )

        db.add(memory)

    db.commit()

    return {"message": "Imported Successfully"}


# ---------------- DASHBOARD ----------------

@router.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):
    return get_dashboard(db)
@router.get("/timeline")
def timeline(db: Session = Depends(get_db)):
    return get_timeline(db)
@router.get("/today")
def today(db: Session = Depends(get_db)):
    return get_today_memories(db)
# ---------------- FAVORITE ----------------

@router.put("/favorite/{memory_id}")
def toggle_favorite(
    memory_id: int,
    db: Session = Depends(get_db)
):
    memory = (
        db.query(MemoryModel)
        .filter(MemoryModel.id == memory_id)
        .first()
    )

    if not memory:
        return {"message": "Memory not found"}

    memory.favorite = not memory.favorite

    db.commit()
    db.refresh(memory)

    return {
        "message": "Favorite Updated",
        "favorite": memory.favorite
    }
# ---------------- PIN ----------------

@router.put("/pin/{memory_id}")
def toggle_pin(
    memory_id: int,
    db: Session = Depends(get_db)
):
    memory = (
        db.query(MemoryModel)
        .filter(MemoryModel.id == memory_id)
        .first()
    )

    if not memory:
        return {"message": "Memory not found"}

    memory.pinned = not memory.pinned

    db.commit()
    db.refresh(memory)

    return {
        "message": "Pin Updated",
        "pinned": memory.pinned
    }