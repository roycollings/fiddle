"""
Entrypoint for the api.
"""
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from config import VERSION

# from file_read import read_file
from model.dao import search_journals

VERSION_URL = f"v{VERSION}"

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
)


class Data(BaseModel):
    """The response model for the /search endopoint"""
    version: str
    term: str
    result: list[object]


class SearchResponse(BaseModel):
    """The response model for the /search endopoint"""
    data: Data


@app.get(f"/{VERSION_URL}/search", response_model=SearchResponse)
async def do_search(term: str | None = Query(
    default=None,
    min_length=3,
    title="Search parameter",
    description="Search term to be performed across all returned fields"
)):
    """Perform search functionality."""
    result = search_journals(term)

    return {
        "data": {
            "version": VERSION,
            "term": term,
            "result": result
        }
    }
