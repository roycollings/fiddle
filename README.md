# Description
This is taken from an exercise I did last year. Since writing this I've gained experience with Material UI and styled comonents. I avoided using Redux for this (just because I didn't need it), but I'm happy to share a sample redux store written for another exercies on request.

# Setup
Before starting, download the metadata file to the appropriate place (approx. 70M):
```
curl https://ai2-semanticscholar-cord-19.s3-us-west-2.amazonaws.com/2020-04-03/metadata.csv --output back-end/model/metadata.csv
```

# Running
```
docker-compose up
```
... or for debugging:

_terminal 1:_
```
cd back-end
python3 -m venv .env3.10
source ./.env3.10/bin/activate
python3 -m pip install --upgrade pip
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0
```

_terminal 2:_
```
cd front-end
yarn
JOURNALS_FILE="model/metadata.csv" yarn start
```

Now the api should be running as a service on http://localhost:8000 (with the usual full swagger docs on `/docs` and `/redoc`), and the web page will be on http://localhost:3000/.

## Principles
- Conform to standard approaches / patterns as a 'first choice' in all decisions.
- A 'test-first' approach where possible. _Always verify tests will fail when they should._
- Consider what wouold be important to the user when prioritising.

## Phase 1 (MVP)
- Deliver search results from a REST api.
- Search and display results in UI
- Simple UI
- Dockerise

## Phase 2
- Github workflows for tests (on both projects)
- Paginate results
- Bookmark journals

## Phase 3
- Improve ui / more focus on style etc...
