import React, { useState } from "react";
import axios from "axios";
import "./style.css";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");

  const analyze = async () => {
    if (!text.trim()) return alert("Please paste a job description first!");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/analyze", { text });
      setResult(res.data.data.result);
      setActiveTab("summary");
    } catch (e) {
      alert("Error: " + (e.response?.data?.error || e.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-container">
      <h1 className="title">VerifyJobs</h1>
      <p className="subtitle">AI-Powered Fake Job Detector</p>

      <textarea
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste job description here..."
        className="input-box"
      ></textarea>

      <button onClick={analyze} disabled={loading} className="analyze-btn">
        {loading ? "Analyzing..." : "🔍 Analyze Job Offer"}
      </button>

      {result && (
        <div className="result-card">
          {/* Tabs */}
          <div className="tabs">
            <button
              className={activeTab === "summary" ? "tab active" : "tab"}
              onClick={() => setActiveTab("summary")}
            >
              🧾 Summary
            </button>
            <button
              className={activeTab === "flags" ? "tab active" : "tab"}
              onClick={() => setActiveTab("flags")}
            >
              🚨 Red Flags
            </button>
            <button
              className={activeTab === "tips" ? "tab active" : "tab"}
              onClick={() => setActiveTab("tips")}
            >
              💡 Tips
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "summary" && (
              <div className="summary">
                <h3>Risk Score</h3>
                <div className="score-bar">
                  <div
                    className={`score-fill ${
                      result.risk_pct < 30
                        ? "low"
                        : result.risk_pct < 70
                        ? "medium"
                        : "high"
                    }`}
                    style={{ width: `${result.risk_pct}%` }}
                  ></div>
                </div>
                <p className="score-text">
                  {result.risk_pct}% chance this offer is suspicious.
                </p>
              </div>
            )}

            {activeTab === "flags" && (
              <div className="flags">
                <h3>🚩 Red Flags Found</h3>
                {result.red_flags.length ? (
                  <ul>
                    {result.red_flags.map((flag, i) => (
                      <li key={i}>{flag}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No major red flags detected 🎉</p>
                )}
              </div>
            )}

            {activeTab === "tips" && (
              <div className="tips">
                <h3>💡 Safety Tips</h3>
                <ul>
                  <li>Never share personal info before verifying the company.</li>
                  <li>Look for official company domain emails.</li>
                  <li>Be cautious if asked to pay for interviews or training.</li>
                  <li>Search the job title + company name for scam reports.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
