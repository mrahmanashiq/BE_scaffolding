// middleware/jwtMiddleware.js
const jwt = require('jsonwebtoken');

// Your secret key for signing and verifying tokens
const secretKey = 'your_secret_key';

const requireAuth = (req, res, next) => {
  // Check if the 'Authorization' header is present in the request
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    // Attach the decoded user ID to the request object for further use
    req.userId = decoded.userId;
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = requireAuth;
