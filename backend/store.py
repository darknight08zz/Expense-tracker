import json
import os

# This is the file where all your data will be permanently saved
DATA_FILE = "store.json"

def load_expenses() -> list:
    """Reads expenses from the JSON file. Runs at the start of every session."""
    if not os.path.exists(DATA_FILE):
        # If the file doesn't exist yet, return an empty list
        return []
    
    # Read the file and load the saved data
    with open(DATA_FILE, "r") as file:
        return json.load(file)

def save_expenses(expenses: list):
    """Writes the current list of expenses to the JSON file to save them forever."""
    with open(DATA_FILE, "w") as file:
        json.dump(expenses, file, indent=4)
