from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models.memory import Memory
from app.models.user import User
from app.routes.memory import router
from app.routes.auth import router as auth_router

app = FastAPI(title="RecallOS")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
from sqlalchemy import text

with engine.connect() as conn:
    try:
        conn.execute(text(
            "ALTER TABLE memories ADD COLUMN favorite BOOLEAN DEFAULT 0"
        ))
    except:
        pass

    try:
        conn.execute(text(
            "ALTER TABLE memories ADD COLUMN pinned BOOLEAN DEFAULT 0"
        ))
    except:
        pass

    conn.commit()

Base.metadata.create_all(bind=engine)

app.include_router(router)
app.include_router(auth_router)

@app.get("/")
def home():
    return {"message": "RecallOS Backend Running 🚀"}