
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  
});
    
// Función para guardar la información de asistencia en la base de datos
async function addAttendance(alumn_id, date, present) {
  const formattedDate = parseDate(date);
  const presentValue = present ? 1 : 0;

  const sql = `INSERT INTO attendance (alumn_id, date, present) VALUES (?, ?, ?) RETURNING *`;
  const values = [alumn_id, formattedDate, presentValue];
console.log("SQL",sql)
console.log("VALUES",values)
  try {
    await pool.query(sql, values);
  } catch (error) {
    throw new Error('Error al guardar la información de asistencia en la base de datos');
  }
}

// Función para obtener todas las entradas de asistencia
async function getAllAttendance() {
  const sql = `SELECT * FROM attendance`;

  try {
    const [rows] = await pool.query(sql);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener la información de asistencia desde la base de datos');
  }
}

// Función para obtener una entrada de asistencia por ID
async function getAttendanceId(id) {
  const sql = `SELECT * FROM attendance WHERE id = ?`;
  const values = [id];

  try {
    const [rows] = await pool.query(sql, values);
    return rows[0];
  } catch (error) {
    throw new Error('Error al obtener la información de asistencia desde la base de datos');
  }
}

// Función para actualizar una entrada de asistencia por ID
async function putAttendanceId(id, alumn_id, date, present) {
  const formattedDate = parseDate(date);
  const presentValue = present ? 1 : 0;

  const sql = `UPDATE attendance SET alumn_id = ?, date = ?, present = ? WHERE id = ?`;
  const values = [alumn_id, formattedDate, presentValue, id];

  try {
    await pool.query(sql, values);
  } catch (error) {
    throw new Error('Error al actualizar la información de asistencia en la base de datos');
  }
}

// Función para eliminar una entrada de asistencia por ID
async function deletedAttendanceId(id) {
  const sql = `DELETE FROM attendance WHERE id = ?`;
  const values = [id];

  try {
    await pool.query(sql, values);
  } catch (error) {
    throw new Error('Error al eliminar la información de asistencia desde la base de datos');
  }
}

function parseDate(date) {
    if (!date) {
      return ''; // Otra acción apropiada si date es undefined
    }
  
    const parts = date.split('/');
    if (parts.length !== 3) {
      throw new Error('Formato de fecha no válido. Se esperaba DD/MM/YYYY.');
    }
  
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  
 
module.exports = {
  addAttendance,
  getAllAttendance,
  getAttendanceId,
  putAttendanceId,
  deletedAttendanceId
};
