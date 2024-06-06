const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  article: { type: String, required: true },
  posted_by: { type: String, required: true },
  posted_at: { type: Date, default: Date.now },
  last_updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', articleSchema);
