from pydantic import BaseModel

class Memory(BaseModel):
    title: str
    content: str
    url: str
    category: str
    timestamp: str