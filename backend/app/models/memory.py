from sqlalchemy import Column, Integer, String
from app.database import Base


class Memory(Base):
    __tablename__ = "memories"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(String)
    url = Column(String)
    category = Column(String)
    timestamp = Column(String)