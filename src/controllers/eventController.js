const eventService = require('../service/eventService');

// Endpoint para crear un nuevo evento
async function addEvent(req, res) {
  const { eventTitle, eventDate, eventTime } = req.body;
console.log(eventTitle, eventDate, eventTime )
  try {
    await eventService.addEvents(eventTitle, eventDate, eventTime);
    res.status(201).send('Evento creado correctamente');
  } catch (error) {
    console.error('Error al crear el evento:', error);
    res.status(500).send('Error al crear el evento');
  }
}

// Endpoint para obtener todos los eventos
async function getAllEvents(req, res) {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error al obtener los eventos:', error);
    res.status(500).send('Error al obtener los eventos');
  }
}

// Endpoint para obtener un evento por ID
async function getEventById(req, res) {
  const { id } = req.params;

  try {
    const event = await eventService.getEventById(id);
    if (!event) {
      res.status(404).send('Evento no encontrado');
      return;
    }
    res.status(200).json(event);
  } catch (error) {
    console.error('Error al obtener el evento:', error);
    res.status(500).send('Error al obtener el evento');
  }
}

// Endpoint para actualizar un evento por ID
async function updateEventById(req, res) {
  const { id } = req.params;
  const { eventTitle, eventDate, eventTime } = req.body;

  try {
    await eventService.updateEventById(id, eventTitle, eventDate, eventTime);
    res.status(200).send('Evento actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el evento:', error);
    res.status(500).send('Error al actualizar el evento');
  }
}

// Endpoint para eliminar un evento por ID
async function deleteEventById(req, res) {
  const { id } = req.params;

  try {
    await eventService.deleteEventById(id);
    res.status(200).send('Evento eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar el evento:', error);
    res.status(500).send('Error al eliminar el evento');
  }
}

module.exports = {
  addEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById
};
