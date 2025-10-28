import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score
import joblib
df = pd.read_csv("verijobs_synthetic.csv")
df['text'] = df['text'].fillna("")
X_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'], test_size=0.2, random_state=42, stratify=df['label'])
pipe = make_pipeline(TfidfVectorizer(max_features=10000, ngram_range=(1,2)), LogisticRegression(max_iter=1000))
pipe.fit(X_train, y_train)
pred = pipe.predict_proba(X_test)[:,1]
pred_cls = (pred >= 0.5).astype(int)
print(classification_report(y_test, pred_cls))
print("AUC:", roc_auc_score(y_test, pred))
joblib.dump(pipe, "tfidf_lr_pipeline.joblib")
print("Saved tfidf_lr_pipeline.joblib")
