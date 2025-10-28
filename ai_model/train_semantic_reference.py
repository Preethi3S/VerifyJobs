import pandas as pd
from sentence_transformers import SentenceTransformer
import joblib
model = SentenceTransformer('all-MiniLM-L6-v2')
df = pd.read_csv("verijobs_synthetic.csv")
safe_texts = df[df['label']==0]['text'].tolist()
safe_embeddings = model.encode(safe_texts, show_progress_bar=True)
mean_safe = safe_embeddings.mean(axis=0)
joblib.dump({ "mean_safe": mean_safe, "model_name": "all-MiniLM-L6-v2" }, "semantic_ref.joblib")
print("Saved semantic_ref.joblib")
