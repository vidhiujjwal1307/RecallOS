from fastapi import FastAPI

from app.database import Base, engine
from app.models.memory import Memory
from app.models.user import User
from app.routes.memory import router
from app.routes.auth import router as auth_router

app = FastAPI(title="RecallOS")

Base.metadata.create_all(bind=engine)

app.include_router(router)
app.include_router(auth_router)

@app.get("/")
def home():
    return {"message": "RecallOS Backend Running 🚀"}