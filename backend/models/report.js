const mongoose = require('mongoose');
const ReportSchema = new mongoose.Schema({
  text: String,
  url: String,
  result: {
    risk_pct: Number,
    tfidf_prob: Number,
    semantic_sim: Number,
    red_flags: [String]
  },
  analyzed_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Report', ReportSchema);
