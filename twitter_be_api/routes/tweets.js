const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const {Tweet} = require('../models/Tweet');
const { createTweet, getTweets, getTweet, likeTweet } = require('../controller/tweetController');

router.post('/tweets', createTweet);

router.get('/tweets', getTweets);

router.get('/tweets/:id', getTweet);

router.post('/tweets/:id/like', likeTweet);

module.exports = router;
