const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  
});

// Servicio para obtener todos los alumnos
async function getAlumns() {
  const result = await pool.query('SELECT * FROM alumns');
  return result.rows;
}

// Servicio para obtener todos los varones
async function getAlumnsMan() {
  console.log('ENTO MASCULINO')
  const result = await pool.query("SELECT * FROM alumns WHERE sex = 'masculino'");
  return result.rows;
}

// Servicio para obtener todas las mujeres
async function getAlumnsWoman() {
  const result = await pool.query("SELECT * FROM alumns WHERE sex = 'femenino'");
  return result.rows;
}

// Servicio para obtener un alumno por id
async function getAlumnById() {
  const result = await pool.query('SELECT * FROM alumns');
  return result.rows;
}

// Servicio para crear un nuevo alumno
async function createAlumn(name, lastName, sex, phone) {
  console.log("entro")
  const result = await pool.query(
    'INSERT INTO alumns (name, lastname, sex, phone) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, lastName, sex, phone]
  );
  console.log("return", result)
  return result.rows[0];
}

// Servicio para actualizar un alumno
async function updateAlumn(id, name, LastName, sex, phone) {
  const result = await pool.query(
    'UPDATE alumns SET name = $1, LastName = $2, sex = $3, phone = $4 WHERE id = $5 RETURNING *',
    [name, LastName, sex, phone, id]
  );
  return result.rows[0];
}

// Servicio para eliminar un alumno
async function deleteAlumn(id) {
  await pool.query('DELETE FROM alumns WHERE id = $1', [id]);
}

module.exports = {
  getAlumnById,
  getAlumnsMan,
  getAlumnsWoman,
  getAlumns,
  createAlumn,
  updateAlumn,
  deleteAlumn
};
