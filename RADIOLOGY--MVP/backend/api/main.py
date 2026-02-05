from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Radiology MVP backend is alive and running!"}
