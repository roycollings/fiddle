"""
Sets the environment up for testing (a 'cheap' way to mock).
"""
import os

os.environ["JOURNALS_FILE"] = "model/dao_fixture.csv"
