const mongoose = require('mongoose');

// Función para generar un UID de 12 dígitos numéricos
function generateUID() {
    return Math.floor(Math.random() * 1e12).toString().padStart(12, '0');
}

// Esquema de Personaje (Character)
const characterSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Referencia al modelo User
        required: true 
    },
    uid: { 
        type: String, 
        required: true, 
        unique: true, 
        default: generateUID // Genera automáticamente un UID único
    },
    name: { 
        type: String, 
        required: true 
    },
    level: { 
        type: Number, 
        default: 1 
    }, 
    xp: { 
        type: Number, 
        default: 0 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Character', characterSchema);
