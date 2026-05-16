const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Cargamos la llave pública desde el archivo físico
const PUBLIC_KEY = process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n');

const authMiddleware = (rolesPermitidos = []) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        console.log("Token recibido:", authHeader); // Agrega este log

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No autenticado. Token faltante.' });
        }

        const token = authHeader.split(' ')[1];
        console.log("Token limpio:", token); // Agrega este también

        try {
            // VERIFICACIÓN CLAVE: Usamos la llave pública física y el algoritmo RS256
            const decoded = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] });
            req.user = decoded;

            if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(decoded.rol)) {
                return res.status(403).json({ message: 'No tienes permisos para esta acción.' });
            }

            next();
        } catch (error) {
            console.log("Error de JWT:", error.message); // <--- ESTO te dirá la verdad en la consola
            return res.status(401).json({ message: 'Token inválido o expirado.' });
        }
    };
};

module.exports = authMiddleware;