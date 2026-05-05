import os

from dotenv import load_dotenv

load_dotenv()

ALLOWED_CATEGORIES = {
    "food": "Food",
    "transport": "Transport",
    "shopping": "Shopping",
    "entertainment": "Entertainment",
    "health": "Health",
    "education": "Education",
    "other": "Other",
}


def normalize_category(category: str) -> str:
    if not isinstance(category, str):
        return "Other"

    return ALLOWED_CATEGORIES.get(category.strip().lower(), "Other")


def categorize_expense(description: str) -> str:
    print(f"\n--- DEBUG START: Categorizing '{description}' ---")
    
    # AI Categorization (Google Gemini)
    prompt = (
        "Categorize this expense into one word only from: "
        "Food, Transport, Shopping, Entertainment, Health, Education, Other. "
        f"Expense: {description}. Reply with one word only."
    )

    try:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            print("DEBUG: GEMINI_API_KEY not found in .env!")
            return "Other"

        print(f"DEBUG: API Key loaded successfully.")

        import google.generativeai as genai

        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-flash-latest")

        print("DEBUG: Sending request to Gemini...")
        response = model.generate_content(prompt)
        category_text = response.text.strip()

        print(f"DEBUG: Gemini raw response: '{category_text}'")

        normalized = normalize_category(category_text)
        print(f"DEBUG: Final category: '{normalized}'")
        print("--- DEBUG END ---\n")

        return normalized
    except Exception as e:
        print(f"DEBUG: Gemini Error: {str(e)}")
        return "Other"
