const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    const { username, password, email, role } = req.body;

    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = await User.create({ username, password: hashedPassword, email, role });
        const payload = {
            username,
            role,
            email
        }
        const key = process.env.key;
        const token = jwt.sign(payload, key, {
            algorithm: 'HS256',
            expiresIn: '1h'
          });
        res.status(201).json({newUser, token});
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Error creating user' });
    }
};

module.exports = createUser;