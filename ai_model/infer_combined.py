import joblib
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
tfidf_pipe = joblib.load("tfidf_lr_pipeline.joblib")
sem_ref = joblib.load("semantic_ref.joblib")
sbert = SentenceTransformer(sem_ref["model_name"])
mean_safe = sem_ref["mean_safe"].reshape(1,-1)
def analyze_text(text):
    prob = tfidf_pipe.predict_proba([text])[0,1]
    emb = sbert.encode([text])
    sim = cosine_similarity(emb, mean_safe)[0,0]
    semantic_risk = 1 - ((sim + 1)/2)
    combined = 0.6 * prob + 0.4 * semantic_risk
    risk_pct = int(round(combined * 100))
    lower = text.lower()
    red_flags = []
    if ("pay" in lower and "training" in lower) or "processing fee" in lower:
        red_flags.append("requests_payment")
    if "bank" in lower or "bank details" in lower:
        red_flags.append("requests_bank_details")
    if "@" not in lower:
        red_flags.append("missing_contact_email")
    return {"risk_pct": risk_pct, "tfidf_prob": prob, "semantic_sim": float(sim), "red_flags": red_flags}
if __name__ == "__main__":
    s = "Huge opportunity! Earn up to $150000 per year — entry level. Send bank details."
    print(analyze_text(s))
