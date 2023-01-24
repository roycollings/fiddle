FROM python:3.10

EXPOSE 8000

WORKDIR /app
COPY . /app

ENV JOURNALS_FILE=/app/model/metadata.csv

RUN python3 -m pip install --upgrade pip && \
  pip install -r requirements.txt

ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0"]