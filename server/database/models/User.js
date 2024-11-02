const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Función para generar un UID de 12 dígitos numéricos
function generateUID() {
    return Math.floor(Math.random() * 1e12).toString().padStart(12, '0');
}

// Esquema de Usuario
const userSchema = new mongoose.Schema({
    uid: { 
        type: String, 
        required: true, 
        unique: true, 
        default: generateUID // UID único automático
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true, // Normaliza correos a minúsculas
        match: [/^\S+@\S+\.\S+$/, 'INVALID_EMAIL_FORMAT'] // Validación básica de email
    },
    vip: {
        type: Boolean,
        default: false
    },
    password: { type: String, required: true },
    accLevel: { 
        type: Number, 
        default: 1, // 1 - Regular por defecto
        enum: [0, 1, 2, 3] // Asegura que solo tenga valores específicos
    },
    createdAt: { type: Date, default: Date.now }
});

// Middleware: Hashear contraseña antes de guardar
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Evita rehash en actualizaciones sin cambios
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err); 
    }
});

// Método: Comparar contraseña ingresada con la almacenada
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Exportar el modelo
module.exports = mongoose.model('User', userSchema);
