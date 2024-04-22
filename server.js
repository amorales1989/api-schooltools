require('dotenv').config();

const express = require('express');
const alumnsController = require('./src/controllers/alumnsControllers');
const attendanceController = require('./src/controllers/attendanceController')


const app = express();
const PORT = process.env.PORT || 3006; // Puerto en el que se ejecutará el servidor

// Configura middleware para manejar solicitudes JSON
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permitir solicitudes desde cualquier origen
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


// Define tus rutas y controladores aquí
// Rutas para alumnos
app.post('/attendance', attendanceController.addAttendance)
app.get('/attendance', attendanceController.getAllAttendance)
app.get('/attendance:id', attendanceController.getAttendanceId)
app.put('/attendance:id', attendanceController.putAttendanceId)
app.delete('/attendance:id', attendanceController.deletedAttendanceId)
app.get('/alumns/man', alumnsController.getAlumnsMan);
app.get('/alumns/woman', alumnsController.getAlumnsWoman);
app.get('/alumns/:id', alumnsController.getAlumnById);
app.get('/alumns', alumnsController.getAlumns);
app.post('/alumns', alumnsController.createAlumn);
app.put('/alumns/:id', alumnsController.updateAlumn);
app.delete('/alumns/:id', alumnsController.deleteAlumn);

// Ruta de ejemplo
app.get('/', (req, res) => {
    res.send('¡Hola desde Express!');
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

const { Pool } = require('pg');
// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,

});

// Prueba de conexión
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error al conectar a la base de datos', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});
