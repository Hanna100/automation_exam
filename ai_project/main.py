from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI()


class InputData(BaseModel):
    text_to_ai: str
    word_to_check: str

HF_URL = "http://api.vicgalle.net/gemma"

@app.post("/ai-check")
def ai_check(data: InputData):
    payload = {
        "prompt": data.text_to_ai,
        "max_tokens": 50
    }

    response = requests.post(HF_URL, json=payload)
    j = response.json()

    ai_text = j.get("response", "")

    return {
        "ai_response": ai_text,
        "word_found": data.word_to_check.lower() in ai_text.lower()
    }


