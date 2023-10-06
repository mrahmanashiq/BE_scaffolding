const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const { User } = require('../models/User');

const registerSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

router.post('/register', async (req, res) => {
  try {
    const { username, password } = registerSchema.parse(req.body);

    const user = await User.create({
      username,
      password: await bcrypt.hash(password, 10),
    });

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, 'secret-key', {
    expiresIn: '1h',
  });

  // Set the token as a cookie (you can also send it in the response body if preferred)
  res.cookie('token', token, { httpOnly: true }); // Set as an HttpOnly cookie for security

  res.json({ token });
});

module.exports = router;