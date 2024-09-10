const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;

// Configuración de CORS...
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

let pacientesRegistro = [];

app.get('/api/pacientesRegistro/:id', (req, res) => {
  // Busca y devuelve un paciente por su ID
});

app.post('/api/pacientesRegistro', (req, res) => {
  console.log('Datos recibidos:', req.body);

  const newPaciente = {
    id: pacientesRegistro.length ? Math.max(...pacientesRegistro.map(p => p.id)) + 1 : 1,
    nombre: req.body.nombre,
    cedula: req.body.cedula,
    apellido_uno: req.body.apellido_uno,
    apellido_dos: req.body.apellido_dos,
    genero: req.body.genero,
    fecha_nacimiento: req.body.fecha_nacimiento,
    telefono: req.body.telefono,
    telefono_emergencia: req.body.telefono_emergencia,
    email: req.body.email,
    direccion: {
      ciudad: req.body.direccion.ciudad,
      sector: req.body.direccion.sector,
      calle: req.body.direccion.calle,
      num_casa: req.body.direccion.num_casa,
      zip_code: req.body.direccion.zip_code
    },
    historia_clinica: [{
      id_historial_registro: 1,
      titulo_historial: req.body.historia_clinica[0].titulo_historial,
      fecha_historial_registro: req.body.historia_clinica[0].fecha_historial_registro,
      Doctor_especialista: req.body.historia_clinica[0].Doctor_especialista,
      observaciones: req.body.historia_clinica[0].observaciones,
      recetas_medicas: req.body.historia_clinica[0].recetas_medicas
    }]
  };

  pacientesRegistro.push(newPaciente);
  
  console.log('Nuevo paciente agregado:', newPaciente);
  console.log('Total de pacientes:', pacientesRegistro.length);

  res.status(201).json(newPaciente);
});

app.delete('/api/pacientesRegistro/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pacienteIndex = pacientesRegistro.findIndex((paciente) => paciente.id === id);
  
  if (pacienteIndex !== -1) {
    pacientesRegistro.splice(pacienteIndex, 1);
    res.status(200).json(`El paciente se ha eliminado satisfactoriamente`);
  } else {
    res.status(404).json({error: `El paciente con id: ${id} no existe`});
  }
});

app.get('/api/pacientesRegistro', (req, res) => {
  res.json(pacientesRegistro);
});

app.put('/api/pacientesRegistro/:id', (req, res) => {
  // Actualiza los datos de un paciente existente
});

app.listen(port, () => {console.log(`Api corriendo en el puerto ${port}`)});