"""
Unit tests for the dao module.
"""
import pytest
from dao import fetch_metadata, search_journals
from assertpy import assert_that


class TestFetchMetadata:
    """
    Tests the fetch_metadata function.
    """

    def test_returns_a_list(self):
        """Returns a list of dicts."""
        data = fetch_metadata(['title', 'url'])

        assert_that(data).is_type_of(list)
        assert_that(data[0]).is_type_of(dict)

    def test_returns_fields(self):
        """Returns the specified fields in a list."""
        data = fetch_metadata(['title', 'url'])
        first_item = data[0]

        assert_that(first_item['title']).is_not_empty()
        assert_that(first_item['url']).is_not_empty()


class TestSearchJournals:
    """
    Tests the search_journals function.
    """

    def test_no_match_gives_array(self):
        """No match  gives []."""
        search_term = "i am not there"
        results = search_journals(search_term)

        assert_that(results).is_type_of(list)
        assert_that(results).is_empty()

    def test_does_not_search_keys(self):
        """Keys arenot searched."""
        results = search_journals("title")

        assert_that(results).is_empty()

    @pytest.mark.parametrize('term, field, match_count', [
        ["smoking", "title", 1],
        ["8703(80)9", "url", 2],
        ["https://", "url", 4],
        ["The *American* J%urnal {of} \\Medi$ine", "journal", 1]
    ])
    def test_search_string(self, term, field, match_count):
        """Tests various search strings."""
        results = search_journals(term)

        print("TERM:", term)
        assert_that(len(results)).is_equal_to(match_count)
        assert_that(results[0][field]).contains(term)
