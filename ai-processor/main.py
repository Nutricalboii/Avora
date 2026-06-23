from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(
    title="Avora AI Solutions Engine",
    description="Python microservice for processing machine learning workloads (Vector embeddings, RAG pipelines, LLM inference).",
    version="1.0.0"
)

# Configure CORS so Next.js frontend can communicate with the FastAPI backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models for Request Payloads ---

class IngestPayload(BaseModel):
    solution_id: str
    documents: List[str]

class TrainPayload(BaseModel):
    solution_id: str
    intents: List[str]

class TestPayload(BaseModel):
    solution_id: str
    input_text: str

# --- Endpoints ---

@app.get("/")
def read_root():
    return {"status": "online", "message": "Avora AI Engine is running."}

@app.post("/rag/ingest")
async def rag_ingest(payload: IngestPayload):
    """
    Placeholder endpoint to accept a solution ID and a mock document payload.
    Future implementation will generate vector embeddings and store them in a vector DB.
    """
    # TODO: Implement Langchain document loaders and embedding generation
    return {
        "status": "success",
        "message": f"Successfully ingested {len(payload.documents)} documents for solution {payload.solution_id}.",
        "solution_id": payload.solution_id
    }

@app.post("/agent/train")
async def agent_train(payload: TrainPayload):
    """
    Placeholder endpoint to accept a solution ID and intent examples for fine-tuning or few-shot prompting.
    """
    # TODO: Implement agent training or prompt registration
    return {
        "status": "success",
        "message": f"Successfully registered {len(payload.intents)} intents for agent training on solution {payload.solution_id}.",
        "solution_id": payload.solution_id
    }

@app.post("/solution/test")
async def solution_test(payload: TestPayload):
    """
    Placeholder endpoint to accept a solution ID and test input payload.
    Future implementation will execute the Langchain/LLM inference pipeline.
    """
    # TODO: Implement LLM inference chain
    mock_response = f"This is a mock response from the AI Engine for input: '{payload.input_text}'"
    return {
        "status": "success",
        "response": mock_response,
        "solution_id": payload.solution_id,
        "latency_ms": 124,
        "cost": 0.0015
    }
