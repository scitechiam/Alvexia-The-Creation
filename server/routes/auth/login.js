// Iniciar sesión
const config = require("../../../config.js");
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'USER_NOT_FOUND' });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ error: 'WRONG_PASSWORD' });
        }

        const payload = {
            user: {
                id: user._id
            }
        };

        const token = jwt.sign(payload, config.SECRET_TOKEN , { expiresIn: '1d' });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('INTERNAL_SERVER_ERROR');
    }
};

module.exports = login;