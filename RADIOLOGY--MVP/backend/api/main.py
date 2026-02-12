# main.py or backend/api/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.api.db import patients

app = FastAPI(title="Radiology MVP API")

#  CORS MUST come BEFORE routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Patient(BaseModel):
    registration_date: str
    first_name: str
    last_name: str
    gender: str
    phone_number: str
    date_of_birth: str
    patient_id: str
    referring_physician_first_name: str
    referring_physician_last_name: str
    
@app.get("/")
def root():
    return {"status": "API is running "}

@app.get("/patients")
def get_patients():
    return patients

@app.post("/patients")
def add_patient(patient: Patient):
    new_patient = patient.dict()
    new_patient["id"] = len(patients) + 1
    patients.append(new_patient)
    return {
        "message": "Patient registered successfully ",
        "patient": new_patient
    }