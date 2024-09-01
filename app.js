const express = require('express');
const app = express();

// Usamos el middleware para analizar datos JSON en el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Datos iniciales de ejemplo
let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

// Endpoint para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    res.send(usuarios);
});

// Endpoint para obtener un usuario por nombre
app.get('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre; // Obtener el nombre desde los parámetros de la URL
    const usuario = usuarios.find(usuario => usuario.nombre === nombre);
    if (usuario) {
        res.send(usuario);
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
});