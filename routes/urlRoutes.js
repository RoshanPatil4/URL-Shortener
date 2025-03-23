const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const Url = require('../models/Url'); // Ensure the model exists

// Shorten URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  
  if (!longUrl) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const urlCode = shortid.generate();
  const shortUrl = `${process.env.BASE_URL}/${urlCode}`;

  try {
    let url = new Url({
      longUrl,
      shortUrl,
      urlCode,
      date: new Date(),
    });

    await url.save();
    res.json(url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
