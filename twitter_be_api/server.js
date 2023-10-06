const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./config/sequelize');
const authRoutes = require('./routes/auth');
const tweetRoutes = require('./routes/tweets');
const requireAuth = require('./middlewares/jwtMiddleware');

app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);

app.use('/auth', authRoutes);
app.use('/api', requireAuth, tweetRoutes);

sequelize
	.sync()
	.then(() => {
		console.log('Database synchronized successfully');
		app.listen(3000, () => {
			console.log('Server is running on port 3000');
		});
	})
	.catch((error) => {
		console.error('Database synchronization failed:', error);
	});
