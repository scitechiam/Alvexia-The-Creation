const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Función para generar un UID de 12 dígitos numéricos
function generateUID() {
    return Math.floor(Math.random() * 1e12).toString().padStart(12, '0');
}


const userSchema = new mongoose.Schema({
    uid: { 
        type: String, 
        required: true, 
        unique: true, 
        default: generateUID // Genera automáticamente un UID único de 12 dígitos numéricos
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accLevel: {type: Number , default: 1}, // 0- banned , 1-regular , 2-moderator , 3-admin
    createdAt: { type: Date, default: Date.now }
});

// Método para hash de contraseña
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comparar contraseñas
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
