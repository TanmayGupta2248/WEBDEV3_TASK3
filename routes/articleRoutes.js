const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

router.post('/create', async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', getArticle, (req, res) => {
  res.json(res.article);
});

router.put('/:id/update', getArticle, async (req, res) => {
  if (req.body.article != null) {
    res.article.article = req.body.article;
  }
  if (req.body.posted_by != null) {
    res.article.posted_by = req.body.posted_by;
  }
  res.article.last_updated_at = Date.now();
  try {
    const updatedArticle = await res.article.save();
    res.json(updatedArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id/delete', getArticle, async (req, res) => {
  try {
    await res.article.remove();
    res.json({ message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getArticle(req, res, next) {
  let article;
  try {
    article = await Article.findById(req.params.id);
    if (article == null) {
      return res.status(404).json({ message: 'Article not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.article = article;
  next();
}

module.exports = router;
