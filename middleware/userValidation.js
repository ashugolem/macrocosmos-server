const jwt = require('jsonwebtoken');

const tokenValidation = (req, res, next) => {
    const token = req.header('token');
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.key);
        req.role = decoded.role; 
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({code: 1, message: 'Token has expired.' });
        } else {
            return res.status(401).json({code: 0, message: 'Invalid token.' });
        }
    }
};

module.exports = tokenValidation;
