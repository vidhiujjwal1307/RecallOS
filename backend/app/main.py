from fastapi import FastAPI

app = FastAPI(title="RecallOS")

@app.get("/")
def home():
    return {"message": "RecallOS Backend Running 🚀"}