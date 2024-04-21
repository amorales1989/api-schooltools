const attendanceService = require('../service/attendanceService');


// Endpoint para crear una nueva entrada de asistencia
async function addAttendance(req, res) {
  const { alumn_id, date, present } = req.body;
console.log(req.body)
  try {
    await attendanceService.addAttendance(alumn_id, date, present);
    res.status(201).send('Información de asistencia guardada correctamente');
  } catch (error) {
    console.error('Error al guardar la información de asistencia:', error);
    res.status(500).send('Error al guardar la información de asistencia');
  }
};

// Endpoint para obtener todas las entradas de asistencia
async function getAllAttendance (req, res){
  try {

    const attendance = await attendanceService.getAllAttendance();
    res.status(200).json(attendance);
  } catch (error) {
    console.error('Error al obtener la información de asistencia:', error);
    res.status(500).send('Error al obtener la información de asistencia');
  }
};

// Endpoint para obtener una entrada de asistencia por ID
async function getAttendanceId (req, res){
  const { id } = req.params;

  try {
    const attendance = await attendanceService.getAttendanceById(id);
    if (!attendance) {
      res.status(404).send('Entrada de asistencia no encontrada');
      return;
    }
    res.status(200).json(attendance);
  } catch (error) {
    console.error('Error al obtener la información de asistencia:', error);
    res.status(500).send('Error al obtener la información de asistencia');
  }
};

// Endpoint para actualizar una entrada de asistencia por ID
async function putAttendanceId (req, res){
  const { id } = req.params;
  const { alumn_id, date, present } = req.body;

  try {
    await attendanceService.updateAttendance(id, alumn_id, date, present);
    res.status(200).send('Información de asistencia actualizada correctamente');
  } catch (error) {
    console.error('Error al actualizar la información de asistencia:', error);
    res.status(500).send('Error al actualizar la información de asistencia');
  }
};

// Endpoint para eliminar una entrada de asistencia por ID
async function deletedAttendanceId (req, res){
  const { id } = req.params;

  try {
    await attendanceService.deleteAttendance(id);
    res.status(200).send('Información de asistencia eliminada correctamente');
  } catch (error) {
    console.error('Error al eliminar la información de asistencia:', error);
    res.status(500).send('Error al eliminar la información de asistencia');
  }
};

module.exports = {
    addAttendance,
    getAllAttendance,
    getAttendanceId,
    putAttendanceId,
    deletedAttendanceId
  };
