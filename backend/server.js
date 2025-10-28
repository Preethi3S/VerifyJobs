require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const Report = require('./models/report');
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/verijobs')
  .then(()=>console.log("MongoDB connected"))
  .catch(e=>console.error("Mongo error", e));
app.post('/api/analyze', async (req, res) => {
  try {
    const { text, url } = req.body;
    const resp = await axios.post(`${process.env.FLASK_URL || 'http://localhost:8000'}/analyze`, { text, url });
    const report = new Report({ text, url, result: resp.data.result });
    await report.save();
    res.json({ ok: true, data: resp.data });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: e.message });
  }
});
app.listen(process.env.PORT || 5000, () => console.log("Backend running on port", process.env.PORT || 5000));
