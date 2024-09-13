//made by us

const fs = require("node:fs/promises");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const rutaDelJson = "paciente.json";

//Roberto import

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

const cargarJson = async () => {
  try {
    const pacientesJson = await fs.readFile(rutaDelJson, "utf-8");
    return JSON.parse(pacientesJson);
  } catch (e) {
    console.error(`Error al leer el json`, e);
    return [];
  }
};

const guardarJson = async (data) => {
  try {
    await fs.writeFile(rutaDelJson, JSON.stringify(data, null, 2), "utf-8");
    console.log("Datos guardados correctamente en el archivo JSON.");
  } catch (e) {
    console.error(`Error al guardar el json`, e);
  }
};

let pacientesRegistro = [];
app.use(cors(corsOptions)); // Roberto import
app.use(express.json()); // Por esta mrd no me funcionaba el res.json

cargarJson().then((data) => {
  pacientesRegistro = data;
});

//const contactID = parsedData.find(contact => contact.id == reqId)

//Obtener todos los pacientes
app.get("/api/pacientesRegistro/all", (req, res) => {
  return res.json(pacientesRegistro).status(200);
});

//obtener paciente por ID

app.get("/api/pacientesRegistro/:id", (req, res) => {
  const paciente = pacientesRegistro.find(
    (paciente) => paciente.id === parseInt(req.params.id)
  );

  if (!paciente) {
    return res.status(404).json({ error: "Paciente no encontrado" });
  }

  res.json(paciente);
});

app.post("/api/pacientesRegistro/:id", (req, res) => {
  const newPacienteRegistro = {
    id: pacientesRegistro.length
      ? Math.max(...pacientesRegistro.map((p) => p.id)) + 1
      : 1, // Revisar esto, lo vi y me gustó.
    value: req.body, //solo con esto y el id funcionaba, comentado para probar lo de roberto y conectarlo con el frontend con cors

    // nombre: req.body.nombre,
    // cedula: req.body.cedula,
    // apellido_uno: req.body.apellido_uno,
    // apellido_dos: req.body.apellido_dos,
    // genero: req.body.genero,
    // fecha_nacimiento: req.body.fecha_nacimiento,
    // telefono: req.body.telefono,
    // telefono_emergencia: req.body.telefono_emergencia,
    // email: req.body.email,

    // direccion: {
    //   ciudad: req.body.direccion.ciudad,
    //   sector: req.body.direccion.sector,
    //   calle: req.body.direccion.calle,
    //   num_casa: req.body.direccion.num_casa,
    //   zip_code: req.body.direccion.zip_code,
    // },

    // historia_clinica: [
    //   {
    //     id_historial_registro: req.body.historia_clinica.length,
    //     titulo_historial:
    //       req.body.historia_clinica[req.body.historia_clinica.length - 1]
    //         .titulo_historial,
    //     fecha_historial_registro:
    //       req.body.historia_clinica[req.body.historia_clinica.length - 1]
    //         .fecha_historial_registro,
    //     Doctor_especialista:
    //       req.body.historia_clinica[req.body.historia_clinica.length - 1]
    //         .Doctor_especialista,

    //   observaciones:[
    //     {
    //         id_observacion: req.body.historia_clinica.observaciones.length,
    //         fecha_observacion: req.body.observaciones[req.body.historia_clinica.observaciones.length-1].fecha_observacion,
    //         observacion_desarrollo: req.body.observaciones[req.body.historia_clinica.observaciones.length-1].observacion_desarrollo
    //     }

    // ],

    //   recetas_medicas:[
    //           {
    //               id_receta_medica: req.params.recetas_medicas.length,
    //               fecha_receta_medica: req.body.recetas_medicas[req.body.historia_clinica.recetas_medicas.length-1].fecha_receta_medica,
    //              recetas_medicas_desarrollo: req.body.recetas_medicas[req.body.historia_clinica.recetas_medicas.length-1].recetas_medicas_desarrollo
    //           }

    // ]
    //},
    // ],
  };

  pacientesRegistro.push(newPacienteRegistro);
  guardarJson(pacientesRegistro); // Guardar los datos actualizados en el archivo JSON
  res.status(201).json(newPacienteRegistro);
});

// Actualizar un paciente Roberto
app.put("/api/pacientesRegistro/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pacienteIndex = pacientesRegistro.findIndex((p) => p.id === id);

  if (pacienteIndex === -1) {
    return res.status(404).json({ error: "Paciente no encontrado" });
  }

  pacientesRegistro[pacienteIndex] = {
    ...pacientesRegistro[pacienteIndex],
    ...req.body,
  };
  guardarJson(pacientesRegistro);
  res.json(pacientesRegistro[pacienteIndex]);
});

app.delete("/api/pacientesRegistro/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const paciente = pacientesRegistro.find(
    (paciente) => parseInt(paciente.id) === id
  );

  if (paciente) {
    pacientesRegistro.splice(
      pacientesRegistro.findIndex((paciente) => paciente.id === id),
      1
    );
    guardarJson(pacientesRegistro);
    return res
      .status(200)
      .json(`El paciente se ha eliminado satisfactoriamente`);
  }

  guardarJson(pacientesRegistro); // Guardar los datos actualizados en el archivo JSON
  res.status(404).json({ error: `El paciente con id: ${id} no existe` });
});

app.listen(port, () => {
  console.log(`Api corriendo en el puerto ${3001}`);
});

// node Api.js
// Falta hacer que el post se guarde
