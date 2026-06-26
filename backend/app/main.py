from fastapi import FastAPI

from app.database import Base, engine
from app.models.memory import Memory
from app.routes.memory import router

app = FastAPI(title="RecallOS")

Base.metadata.create_all(bind=engine)

app.include_router(router)

@app.get("/")
def home():
    return {"message": "RecallOS Backend Running 🚀"}