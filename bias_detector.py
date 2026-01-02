BIAS_KEYWORDS = {
    "gênero": ["mulher", "homem", "menina", "menino"],
    "generalização": ["todos", "sempre", "nunca"]
}

def detect_bias(text):
    findings = []

    for category, words in BIAS_KEYWORDS.items():
        for word in words:
            if word in text.lower():
                findings.append(f"Possível viés de {category}")

    score = len(findings)
    return {
        "score": score,
        "findings": list(set(findings)),
        "recommendation": "Usar linguagem neutra e baseada em evidências."
    }
