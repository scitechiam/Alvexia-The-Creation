// Iniciar sesión
const config = require("../../../config.js");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/User.js");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ status: "error" , error: "USER_NOT_FOUND" });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.json({ status:"error" , error: "WRONG_PASSWORD" });
        }

        const payload = {
            user: {
                id: user._id
            }
        };

        const token = jwt.sign(payload, config.SECRET_TOKEN , { expiresIn: "1d" });

        res.json({ status: "success" , token });
    } catch (err) {
        console.error(err.message);
        res.send({status: "error" , error: "INTERNAL_SERVER_ERROR"});
    }
};

module.exports = login;