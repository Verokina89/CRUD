// Importamos el módulo Express
const express = require('express');

// Creamos una instancia de Express
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

