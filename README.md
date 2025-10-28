# VeriJobs - AI Early-Warning System for Fake Job Offers
This repository contains a full-stack trainable demo:
- ai_model: Python training & Flask model server
- backend: Node/Express API + MongoDB persistence
- frontend: Vite React UI
- chrome-extension: optional quick-check extension
## Quick start (local)
1. AI model:
   cd ai_model
   python -m venv venv
   source venv/bin/activate   # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python gen_synthetic_dataset.py
   python train_tfidf_lr.py
   python train_semantic_reference.py
   python app.py
2. Backend:
   cd ../backend
   cp .env.example .env
   npm install
   npm start
3. Frontend:
   cd ../frontend
   npm install
   npm run dev
4. Open the frontend (Vite) at http://localhost:5173 and paste job descriptions to analyze.
## Notes
- The included dataset is synthetic. Replace with labeled real data for production.
- Do not store PII. Redact sensitive data if users paste it.
"# VerifyJobs" 
