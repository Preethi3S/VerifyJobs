import csv, json, random, uuid
scam_phrases = [
    "pay for training", "wire transfer", "send money", "pay fee", "visa sponsorship for a fee",
    "unrealistic salary", "work from home and make", "limited time offer", "act fast",
    "send ID and bank details", "only pay $", "guaranteed hire", "no interview required",
]
safe_phrases = [
    "competitive salary", "company benefits", "health insurance", "office location",
    "experience required", "senior-level", "apply via company career portal", "job code"
]
def gen_scam_text():
    text = []
    text.append(f"Huge opportunity! Earn up to ${random.randint(50000,200000)} per year — entry level.")
    text.append(random.choice(scam_phrases))
    if random.random() < 0.5:
        text.append("Contact us immediately. Limited-time offer.")
    if random.random() < 0.4:
        text.append("We require a small processing fee of $"+str(random.randint(50,300)))
    if random.random() < 0.6:
        text.append("Send your bank details and ID.")
    return " ".join(text)
def gen_safe_text():
    text = []
    text.append(random.choice(safe_phrases))
    text.append("Responsibilities include: " + random.choice([
        "frontend development with React",
        "backend APIs with Node.js",
        "data analysis with Python"
    ]))
    text.append("Location: Bangalore, India. Apply at careers@company.com.")
    return " ".join(text)
def detect_flags(text):
    flags = []
    for p in scam_phrases:
        if p in text.lower():
            flags.append(p)
    if "@" not in text:
        flags.append("missing_contact_email")
    return flags
def make_row(label):
    text = gen_scam_text() if label==1 else gen_safe_text()
    flags = detect_flags(text)
    salary = random.choice([None, random.randint(20000,200000)])
    request_payment = 1 if any("pay" in f or "fee" in f or "wire" in f for f in flags) else 0
    missing_company = 1 if "missing_contact_email" in flags else 0
    return {
        "id": str(uuid.uuid4()),
        "text": text,
        "label": label,
        "red_flags": json.dumps(flags),
        "salary": salary if salary else "",
        "request_payment": request_payment,
        "missing_company": missing_company
    }
def main(out="verijobs_synthetic.csv", n=2000):
    with open(out, "w", newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=["id","text","label","red_flags","salary","request_payment","missing_company"])
        writer.writeheader()
        for _ in range(n//2):
            writer.writerow(make_row(0))
            writer.writerow(make_row(1))
    print("Wrote", out)
if __name__ == "__main__":
    main()
