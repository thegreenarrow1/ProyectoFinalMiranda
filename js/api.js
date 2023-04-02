const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

// Obtener todos los alumnos
app.get('/api/alumnos', function(req, res) {
  const db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
  res.json(db.alumnos);
});

// Obtener alumno por su ID
app.get('/api/alumnos/:id', function(req, res) {
  const db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
  const alumno = db.alumnos.find(u => u.id === parseInt(req.params.id));
  if (!alumno) {
    res.status(404).send('El alumno no fue encontrado.');
  } else {
    res.json(alumno);
  }
});

// Agregar un nuevo alumno
app.post('/api/alumnos', function(req, res) {
  const db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
  const newalumno = req.body;
  newalumno.id = db.alumnos.length + 1;
  db.alumnos.push(newalumno);
  fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
  res.json(newalumno);
});

// Actualizar un alumno existente
app.put('/api/alumnos/:id', function(req, res) {
  const db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
  const alumnoIndex = db.alumnos.findIndex(u => u.id === parseInt(req.params.id));
  if (alumnoIndex === -1) {
    res.status(404).send('El alumno no fue encontrado.');
  } else {
    const updatedalumno = Object.assign({}, db.alumnos[alumnoIndex], req.body);
    db.alumnos[alumnoIndex] = updatedalumno;
    fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
    res.json(updatedalumno);
  }
});

// Eliminar un alumno existente
app.delete('/api/alumnos/:id', function(req, res) {
  const db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
  const alumnoIndex = db.alumnos.findIndex(u => u.id === parseInt(req.params.id));
  if (alumnoIndex === -1) {
    res.status(404).send('El alumno no fue encontrado.');
  } else {
    db.alumnos.splice(alumnoIndex, 1);
    fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
    res.sendStatus(204);
  }
});

app.listen(3000, function() {
  console.log('Servidor escuchando en el puerto 3000.');
});