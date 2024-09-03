const express = require('express');
const app = express();

// Middleware para analizar datos JSON.
app.use(express.json()); //Permite procesar en formato JSON.
app.use(express.urlencoded({ extended: true }));  //// Permite el análisis de cuerpos URL-encoded

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

////READ (se utiliza el READ para poder trabajarlo)
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
      <h1>Luchadores Street Fighter II</h1>
      <ul>
        ${usuarios.map(usuario => `<li>
          <h2>Nombre: ${usuario.nombre}</li></h2>
          <p>Edad: ${usuario.edad}</p>
          <p>procedencia: ${usuario.lugarProcedencia}</p>
          `).join("")}
      </ul>
      </body>
</html>
  `)
})

// Endpoint para obtener todos los usuarios en formato JSON.
//CREATE(del CRUD). nos devuelve en formato json
app.get('/usuarios', (req, res) => {
    res.json(usuarios); // res.send(usuarios);
});

// Endpoint para obtener usuario por nombre.
app.get('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre.toLowerCase(); //Se obtiene el nombre desde los parámetros de la URL y se convierten en minusclas.
    const usuario = usuarios.find(usuario => usuario.nombre.toLowerCase() === nombre);
    if(!usuario) {
      res.status(404).json({mensaje: "El usuario no existe"})
    } else {
      res.json(usuario)
    }
});

// // Endpoint para crear un nuevo usuario. 
//Ruta o Middleware POST. Crea y envia el nuevo usuario y lo agrega a la lista.
app.post('/usuarios', (req, res) => {
    const maxId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) : 0;
    const nuevoUsuario = {
        id: maxId + 1,  // Asignación d ID que no recibla los eliminados.
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    };
    usuarios.push(nuevoUsuario);
    res.redirect("/usuarios")    // res.status(201).json(nuevoUsuario);   // Retorna solo el nuevo usuario y con código de estado 201 (creado)
});

// // PUT /usuarios/:nombre:Actualiza la información del usuario por su nombre.
app.put("/usuarios/:nombre", (req, res) => {
  const nombre = req.params.nombre
  const nombreNuevo = req.body.nombre || ""
  const edadNueva = req.body.edad || ""
  const ProcedenciaNueva = req.body.lugarProcedencia
  
  const index = usuarios.findIndex(usuario => usuario.nombre === nombre);
  if(index === -1) {
    res.status(404).json({error: "usuario no encontrado"})
  } else {
    usuarios[index] = {
    ...usuarios[index],
    nombre: nombreNuevo || usuarios[index].nombre,
    dad: edadNueva || usuarios[index].edad,
    lugarProcedencia: ProcedenciaNueva || usuarios[index].lugarProcedencia
    }
    res.json(usuarios[index])
  }
});

// DELETE /usuarios/:nombre: Elimina un usuario por nombre
app.delete('/usuarios/:nombre', (req, res) => {
  const nombre = req.params.nombre.toLowerCase();
  const index = usuarios.findIndex(usuario => usuario.nombre.toLowerCase() === nombre);
  if(index === -1) {
    res.status(404).json({error: "usuario no encontrado"})
  } else {
    usuarios = usuarios.filter(usuario => usuario.nombre !== nombre)
    res.json({mensaje: "usuario eliminado correctamente"})
  }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`La aplicación CRUD está escuchando en el puerto http://localhost:${PORT}`);
});



/*--- Modificacines de blques de codigos   
app.put('/usuarios/:nombre', (req, res) => {
  const nombre = req.params.nombre.toLowerCase();
  // Encuentra el índice del usuario en la lista que coincida con el nombre proporcionado.
  const index = usuarios.findIndex(usuario => usuario.nombre.toLowerCase() === nombre);
  // Si el usuario es encontrado, actualiza sus datos.
  if (index !== -1) {
      // Crear un nuevo objeto usuario que será la versión actualizada.
      const usuarioActualizado = {
          id: usuarios[index].id, // Mantiene el mismo ID.
          nombre: req.body.nombre || usuarios[index].nombre, // Si no se proporciona un nuevo nombre, mantén el actual.
          edad: req.body.edad || usuarios[index].edad, // Si no se proporciona una nueva edad, mantén la actual.
          lugarProcedencia: req.body.lugarProcedencia || usuarios[index].lugarProcedencia // Si no se proporciona un nuevo lugar de procedencia, mantén el actual.
      };

      // Reemplaza el usuario viejo con el nuevo usuario actualizado.
      usuarios[index] = usuarioActualizado;

      // Envía una respuesta con el usuario actualizado.
      res.json(usuarioActualizado);

  } else {
      // Si el usuario no es encontrado, responde con un mensaje de error 404 (No encontrado).
      res.status(404).send('Usuario no encontrado');
  }
});

app.delete('/usuarios/:nombre', (req, res) => {
  const nombre = req.params.nombre.toLowerCase();
  const usuario = usuarios.find(usuario => usuario.nombre.toLowerCase() === nombre);
  if (usuario) {
    usuarios = usuarios.filter(usuario => usuario.nombre.toLowerCase() !== nombre);
    res.json(usuarios);
  } else {
    res.status(404).send('Usuario no encontrado');
  }
});

---*/

/*---
const express = require("express")
const app = express()

let usuarios = [
  { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
  { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
  { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
  { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
  { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

let nextId = usuarios.length + 1

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
      <h1>Luchadores Street Fighter II</h1>
      <ul>
        ${usuarios.map(usuario => `<li>
          <h2>Nombre: ${usuario.nombre}</li></h2>
          <p>Edad: ${usuario.edad}</p>
          <p>procedencia: ${usuario.lugarProcedencia}</p>
          `).join("")}
      </ul>
      </body>
</html>
  `)
})

app.get("/usuarios", (req, res) => {
  res.json(usuarios)
})

app.get("/usuarios/:nombre", (req, res) => {
  const nombre = req.params.nombre
  const usuario = usuarios.find(usuario => usuario.nombre === nombre)

  if(!usuario) {
    res.status(404).json({mensaje: "El usuario no existe"})
  } else {
    res.json(usuario)
  }
})

app.post("/usuarios", (req, res) => {
  const nuevoUsuario = {
    // id: usuarios.length + 1,
    id: nextId++,
    nombre: req.body.nombre,
    edad: req.body.edad,
    lugarProcedencia: req.body.lugarProcedencia
  }
  usuarios.push(nuevoUsuario)
  res.redirect("/usuarios")
})

app.put("/usuarios/:nombre", (req, res) => {
  const nombre = req.params.nombre
  const nombreNuevo = req.body.nombre || ""
  const edadNueva = req.body.edad || ""
  const ProcedenciaNueva = req.body.lugarProcedencia

  const index = usuarios.findIndex(usuario => usuario.nombre === nombre)

  if(index === -1) {
    res.status(404).json({error: "usuario no encontrado"})
  } else {
    usuarios[index] = {
      ...usuarios[index], 
      nombre: nombreNuevo || usuarios[index].nombre, 
      edad: edadNueva || usuarios[index].edad,
      lugarProcedencia: ProcedenciaNueva || usuarios[index].lugarProcedencia
    }
    res.json(usuarios[index])
  }
})

app.delete("/usuarios/:nombre", (req, res) => {
  const nombre = req.params.nombre
  const index = usuarios.findIndex(usuario => usuario.nombre === nombre)

  if(index === -1) {
    res.status(404).json({error: "usuario no encontrado"})
  } else {
    usuarios = usuarios.filter(usuario => usuario.nombre !== nombre)
    res.json({mensaje: "usuario eliminado correctamente"})
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`La aplicación CRUD está escuchando en el puerto http://localhost:${PORT}`)
})
---*/