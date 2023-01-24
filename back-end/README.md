Figuring this out as I go (this will change for sure as I get into it).

# Setup
**NOTE: Written with Python 3.10.**

1. Create the virtual environment:
> ```
> python3 -m venv .env3.10
> ```
2. Switch to it:
> ```
> source ./.env3.10/bin/activate
> ```
3. Upgrade pip:
> ```
> python3 -m pip install --upgrade pip
> ```
4. Install requirements:
> ```
> pip install -r requirements.txt
> ```

# Testing
To run all tests:
```
pytest
```

To monitor all tests as you develop:
```
ptw
```

# Running
To keep it running locally (and watching for changes):
```
uvicorn main:app --reload --host 0.0.0.0
```