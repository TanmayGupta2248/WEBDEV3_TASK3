const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/articleDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const articleRoutes = require('./routes/articleRoutes');
const authRoutes = require('./routes/authRoutes');
const authenticateToken = require('./middleware/auth');

app.use('/auth', authRoutes);
app.use('/article', authenticateToken, articleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
