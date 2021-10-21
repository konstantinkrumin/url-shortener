require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;

const urlSchema = new Schema({
  original_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
  },
});

const Url = mongoose.model('url', urlSchema);

// TODO: ADD SOME ERROR HANDLING HERE
const createAndSaveUrl = (originalUrl) => {
  const url = new Url({
    original_url: originalUrl,
    short_url: 'TEST',
  });

  url.save();
};

// TODO: FINISH THIS FUNCTION
const getOriginalUrl = () => {};

const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

app.get('/api/shorturl/:url', (req, res) => {
  res.json({ test: 'Get API works!' });
});

app.post('/api/shorturl', (req, res) => {
  const url = req.body.url;
  res.json({ test: 'Post API works!' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
