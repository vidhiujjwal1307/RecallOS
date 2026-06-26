from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base


class Memory(Base):
    __tablename__ = "memories"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)
    content = Column(String)
    url = Column(String)
    category = Column(String)
    timestamp = Column(String)

    favorite = Column(Boolean, default=False)
    pinned = Column(Boolean, default=False)