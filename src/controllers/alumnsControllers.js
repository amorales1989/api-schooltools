const alumnsService = require('../service/alumnsService');

// Controlador para obtener todos los alumnos
async function getAlumns(req, res) {
  try {
    const alumns = await alumnsService.getAlumns();
    res.json(alumns);
  } catch (error) {
    console.error('Error al obtener los alumnos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

// Controlador para obtener todos los alumnos
async function getAlumnsMan(req, res) {
  try {
    const alumns = await alumnsService.getAlumnsMan();
    res.json(alumns);
  } catch (error) {
    console.error('Error al obtener los alumnos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

// Controlador para obtener todos los alumnos
async function getAlumnsWoman(req, res) {
  try {
    const alumns = await alumnsService.getAlumnsWoman();
    res.json(alumns);
  } catch (error) {
    console.error('Error al obtener los alumnos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

// Controlador para obtener todos los alumnos
async function getAlumnById(req, res) {
  try {
    const alumns = await alumnsService.getAlumnById();
    res.json(alumns);
  } catch (error) {
    console.error('Error al obtener los alumnos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}
// Controlador para crear un nuevo alumno
async function createAlumn(req, res) {
  console.log(req.body)
  const { name, lastName, sex, phone } = req.body;
  try {
    const nuevoAlumn = await alumnsService.createAlumn(name, lastName, sex, phone);
    res.status(201).json(nuevoAlumn);
  } catch (error) {
    console.error('Error al crear un nuevo alumno:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

// Controlador para actualizar un alumno
async function updateAlumn(req, res) {
  const id = req.params.id;
  const { name, lastName, sex, phone } = req.body;
  try {
    const alumnActualizado = await alumnsService.updateAlumn(id, name, lastName, sex, phone);
    res.json(alumnActualizado);
  } catch (error) {
    console.error('Error al actualizar un alumno:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

// Controlador para eliminar un alumno
async function deleteAlumn(req, res) {
  const id = req.params.id;
  try {
    await alumnsService.deleteAlumn(id);
    res.json({ message: 'Alumno eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar un alumno:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

module.exports = {
  getAlumns,
  getAlumnById,
  getAlumnsWoman,
  getAlumnsMan,
  createAlumn,
  updateAlumn,
  deleteAlumn
};
