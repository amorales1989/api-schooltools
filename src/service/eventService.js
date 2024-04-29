const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

// Función para guardar la información de un evento en la base de datos
async function addEvents(eventTitle, eventDate, eventTime) {

  const sql = `INSERT INTO events (event_title, event_date, event_time) VALUES ($1, $2, $3) RETURNING *`;
  const values = [eventTitle, eventDate, eventTime];
  try {
    const { rows } = await pool.query(sql, values);
    return rows[0];
  } catch (error) {
    throw new Error('Error al guardar la información del evento en la base de datos');
  }
}

async function getAllEvents() {
  const sql = `SELECT * FROM events`;
  try {
    const { rows } = await pool.query(sql);
    const currentDate = new Date();
    const futureEvents = rows.filter(event => {
      const [day, month, year] = event.event_date.split('/');
      const eventDate = new Date(`${month}/${day}/${year}`);
      return eventDate > currentDate;
    });
    
    futureEvents.sort((a, b) => {
      const [dayA, monthA, yearA] = a.event_date.split('/');
      const [dayB, monthB, yearB] = b.event_date.split('/');
      const dateA = new Date(`${monthA}/${dayA}/${yearA}`);
      const dateB = new Date(`${monthB}/${dayB}/${yearB}`);
      return dateA - dateB;
    });
    
    const upcomingEvents = futureEvents.slice(0, 4);
    return upcomingEvents;
  } catch (error) {
    throw new Error('Error al obtener la información de los eventos desde la base de datos');
  }
}



// Función para obtener un evento por ID
async function getEventById(id) {
  const sql = `SELECT * FROM events WHERE id = $1`;
  const values = [id];

  try {
    const { rows } = await pool.query(sql, values);
    return rows[0];
  } catch (error) {
    throw new Error('Error al obtener la información del evento desde la base de datos');
  }
}

// Función para actualizar un evento por ID
async function updateEventById(id, eventTitle, eventDate, eventTime) {

  const sql = `UPDATE events SET event_title = $1, event_date = $2, event_time = $3 WHERE id = $4`;
  const values = [eventTitle, eventDate, eventTime, id];

  try {
    await pool.query(sql, values);
  } catch (error) {
    throw new Error('Error al actualizar la información del evento en la base de datos');
  }
}

// Función para eliminar un evento por ID
async function deleteEventById(id) {
  const sql = `DELETE FROM events WHERE id = $1`;
  const values = [id];

  try {
    await pool.query(sql, values);
  } catch (error) {
    throw new Error('Error al eliminar la información del evento desde la base de datos');
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
  addEvents,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById
};
