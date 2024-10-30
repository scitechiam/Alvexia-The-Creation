const config = require("../../../config.js");
const jwt = require('jsonwebtoken');
const User = require('../../database/models/User.js');

// Registrar un nuevo usuario
const register = async (req, res) => {
    if(!req.body.email || !req.body.password) return res.status(400).json({error: 'MISSING_DATA'});
    

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.json({ status: "error" ,error: 'USER_EXIST' });
        }

        user = new User({
            email,
            password
        });

        await user.save();

        const payload = {
            user: {
                id: user._id
            }
        };

        const token = jwt.sign(payload, config.SECRET_TOKEN , { expiresIn: '1h' });

        res.json({status: "success" , token });
    } catch (err) {
        console.error(err.message);
        res.send({status: "error" , error: 'INTERNAL_SERVER_ERROR'});
    }
};

module.exports = register;