require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
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

const createAndSaveUrl = (originalUrl) => {
  return Url.count({})
    .then((count) => {
      const url = new Url({
        original_url: originalUrl,
        short_url: count + 1,
      });

      return url.save();
    })
    .then((savedObj) => {
      return savedObj;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getOriginalUrl = (shortUrl) => {
  return Url.find({ short_url: shortUrl })
    .then((urlObj) => {
      return urlObj[0]['original_url'];
    })
    .catch((err) => {
      console.log(err);
    });
};

const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

app.get('/api/shorturl/:url', (req, res) => {
  const url = req.params.url;
  getOriginalUrl(url)
    .then((originalUrl) => {
      res.redirect(originalUrl);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/api/shorturl', (req, res) => {
  const url = req.body.url;
  createAndSaveUrl(url)
    .then((result) => {
      return res.json({ original_url: result.original_url, short_url: result.short_url });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
