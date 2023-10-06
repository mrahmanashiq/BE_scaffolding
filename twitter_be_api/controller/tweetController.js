const { Tweet } = require('../models/Tweet');
const { User } = require('../models/User');

const createTweet = async (req, res) => {
	const { content } = req.body;
	const userId = req.userId;

	try {
		const tweet = await Tweet.create({ content, UserId: userId });
		res.json(tweet);
	} catch (error) {
		res.status(400).json({ error: 'Tweet creation failed' });
	}
};

const getTweets = async (req, res) => {
	try {
		const tweets = await Tweet.findAll({
			include: [{ model: User, attributes: ['username'] }],
		});
		res.json(tweets);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: 'Tweet fetching failed' });
	}
};

const getTweet = async (req, res) => {
	const tweetId = req.params.id;

	try {
		const tweet = await Tweet.findByPk(tweetId, {
			include: [{ model: User, attributes: ['username'] }],
		});

		if (!tweet) {
			return res.status(404).json({ error: 'Tweet not found' });
		}

		res.json(tweet);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: 'Tweet fetching failed' });
	}
};

const likeTweet = async (req, res) => {
	const tweetId = req.params.id;
	const userId = req.userId; 
	try {
		const tweet = await Tweet.findByPk(tweetId);

		if (!tweet) {
			return res.status(404).json({ error: 'Tweet not found' });
		}

		await tweet.addUser(userId);
		res.json({ message: 'Tweet liked' });
	} catch (error) {
		res.status(400).json({ error: 'Tweet liking failed' });
	}
};

module.exports = {
	createTweet,
	getTweets,
	getTweet,
	likeTweet,
};
