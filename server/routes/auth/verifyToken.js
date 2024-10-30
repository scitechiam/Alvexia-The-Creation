const jwt = require('jsonwebtoken'); // Importa jsonwebtoken
const config = require("../../../config.js");

// Middleware para verificar el token
function verifyToken(req, res, next) {
    const token = req.header('x-auth-token'); // Obtener el token del encabezado

    if (!token) {
        return res.status(401).json({ msg: 'NO_TOKEN' }); // Respuesta si no hay token
    }

    try {
        // Verificar el token con la clave secreta
        const decoded = jwt.verify(token, config.SECRET_TOKEN);
        req.user = decoded.user; // Decodificar el usuario y añadirlo a la solicitud
        next(); // Pasar al siguiente middleware o controlador
    } catch (err) {
        // Responder con error si el token no es válido
        res.status(401).json({ msg: 'INVALID_TOKEN', error: err.message });
    }
}

// Function to verify token from Socket.io
function verifySocketToken(token) {
    try {
        // Verify the token with the secret key
        const decoded = jwt.verify(token, config.SECRET_TOKEN);
        return { valid: true, user: decoded.user }; // Return the decoded user data if valid
    } catch (err) {
        console.error('Token verification failed:', err.message);
        return { valid: false, error: err.message }; // Return error message if the token is invalid
    }
}

module.exports = {
    verifyToken,
    verifySocketToken
};
