"""
Test endpionts.
"""
from fastapi.testclient import TestClient
from assertpy import assert_that
from config import metadata_response_fields, VERSION

from main import app

version_path = f"v{VERSION}"


class TestSearch:
    """Test search endpiont"""

    def test_search_succeeds(self):
        """Successful search"""
        with TestClient(app) as client:
            term = "smoking"
            response = client.get(f"{version_path}/search?term={term}")

            assert_that(response.status_code).is_equal_to(200)

    def test_returns_search_term(self):
        """Response contains search term"""
        with TestClient(app) as client:
            term = "smoking"
            response = client.get(f"{version_path}/search?term={term}")

            response_json = response.json()
            actual_term = response_json["data"]["term"]

            assert_that(actual_term).is_equal_to(term)

    def test_returns_data(self):
        """Response contains correct data structure"""
        with TestClient(app) as client:
            term = "smoking"
            response = client.get(f"{version_path}/search?term={term}")

            response_json = response.json()
            data = response_json["data"]["result"]

            assert_that(data).is_instance_of(list)
            assert_that(data).is_length(1)

            data_fields = data[0].keys()
            field_diff = set(data_fields) ^ set(metadata_response_fields)
            print("Field difference:", field_diff)
            assert_that(len(field_diff)).is_equal_to(0)
