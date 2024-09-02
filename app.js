const express = require('express');
const app = express();

// Middleware para analizar datos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Endpoint para obtener usuario por nombre
app.get('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre.toLowerCase(); //Se obtiene el nombre desde los parámetros de la URL y se convierten en minusclas.
    const usuario = usuarios.find(usuario => usuario.nombre.toLowerCase() === nombre);

    if (usuario) {
        res.send(usuario);
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});

// Endpoint para crear un nuevo usuario
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,  // Asignamos ID único
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    };
    usuarios.push(nuevoUsuario);
    res.send(usuarios);
});

// PUT /usuarios/:nombre:Actualiza la información del usuario por su nombre.
app.put('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre.toLowerCase();
    const index = usuarios.findIndex(usuario => usuario.nombre.toLowerCase() === nombre);
     //verifica si se encontro al usuario; si index no es -1 es que encontro un usuario con ese nombre.
    if (index !== -1) { 
        usuarios[index] = {
            ...usuarios[index],  //Copia todos los datos actuales y los conserva los datos existentes.
            ...req.body  //Actualiza los datos que se envian en la solicitud.
        };
        res.send(usuarios);  //Envia como respuesta la lista de usuarios actualizada.
    } else { //Sino lo encuentra envia como respuesta error 404
        res.status(404).send('Usuario no encontrado');
    }
});

// DELETE /usuarios/:nombre: Elimina un usuario por nombre
app.delete('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre.toLowerCase();
    const usuario = usuarios.find(usuario => usuario.nombre.toLowerCase() === nombre);
    if (usuario) {
        usuarios = usuarios.filter(usuario => usuario.nombre.toLowerCase() !== nombre);
        res.send(usuarios);
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`El Servidor está ejecutandose en http://localhost:${PORT}`);
});