"""
Interface for the data store.
"""
import os
import csv
from typing import List
from dotenv import load_dotenv
from config import metadata_response_fields

load_dotenv()


def fetch_metadata(fields: list[str]) -> List[object]:
    """
    Returns the selected fields from the data store.
    """
    # Can be swapped out for a database etc...
    source = os.environ["JOURNALS_FILE"]

    with open(source, encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        rows = list(reader)

        final = []
        for row in rows:
            record = {}

            for field in fields:
                record[field] = row[field]

            final.append(record)

        return final


def search_journals(term: str) -> List[object]:
    """
    Returns matching records from the data store.
    """
    journals = fetch_metadata(metadata_response_fields)

    keys = journals[0].keys()
    results = []

    # For each row, remove keys and concat the rest to a string we can match against.
    for journal in journals:
        all_as_string = ""

        for key in keys:
            all_as_string += journal[key] + " "

        if term.lower() in all_as_string.lower():
            results.append(journal)

    return results
