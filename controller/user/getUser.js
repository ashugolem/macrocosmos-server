const User = require('../../models/user');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

module.exports = getAllUsers;