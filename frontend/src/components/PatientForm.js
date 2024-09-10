import React, { useState, useEffect } from 'react';

const PatientForm = ({ patientToEdit, onPatientAdded, onPatientUpdated }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    apellido_uno: '',
    apellido_dos: '',
    genero: 'mujer',
    fecha_nacimiento: '',
    telefono: '',
    telefono_emergencia: '',
    email: '',
    ciudad: '',
    sector: '',
    calle: '',
    num_casa: '',
    zip_code: '',
    titulo_historial: '',
    fecha_historial_registro: '',
    Doctor_especialista: '',
    observaciones: '',
    recetas_medicas: ''
  });

  useEffect(() => {
    if (patientToEdit) {
      setFormData({
        ...patientToEdit,
        ...patientToEdit.direccion,
        titulo_historial: patientToEdit.historia_clinica[0]?.titulo_historial || '',
        fecha_historial_registro: patientToEdit.historia_clinica[0]?.fecha_historial_registro || '',
        Doctor_especialista: patientToEdit.historia_clinica[0]?.Doctor_especialista || '',
        observaciones: patientToEdit.historia_clinica[0]?.observaciones.join('\n') || '',
        recetas_medicas: patientToEdit.historia_clinica[0]?.recetas_medicas.join('\n') || ''
      });
    }
  }, [patientToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = patientToEdit
        ? `http://localhost:3001/api/pacientesRegistro/${patientToEdit.id}`
        : 'http://localhost:3001/api/pacientesRegistro';
      const method = patientToEdit ? 'PUT' : 'POST';

      const pacienteData = {
        nombre: formData.nombre,
        cedula: formData.cedula,
        apellido_uno: formData.apellido_uno,
        apellido_dos: formData.apellido_dos,
        genero: formData.genero,
        fecha_nacimiento: formData.fecha_nacimiento,
        telefono: formData.telefono,
        telefono_emergencia: formData.telefono_emergencia,
        email: formData.email,
        direccion: {
          ciudad: formData.ciudad,
          sector: formData.sector,
          calle: formData.calle,
          num_casa: formData.num_casa,
          zip_code: formData.zip_code
        },
        historia_clinica: [{
          id_historial_registro: 1, // Para agregar un nuevo registro
          titulo_historial: formData.titulo_historial,
          fecha_historial_registro: formData.fecha_historial_registro,
          Doctor_especialista: formData.Doctor_especialista,
          observaciones: formData.observaciones.split('\n'), 
          recetas_medicas: formData.recetas_medicas.split('\n') 
        }]
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pacienteData),
      });

      if (!response.ok) {
        throw new Error('Error al procesar el paciente');
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      
      if (patientToEdit) {
        onPatientUpdated(data);
        alert('Paciente actualizado con éxito');
      } else {
        onPatientAdded(data);
        alert('Paciente registrado con éxito');
      }

      // Resetear el formulario
      setFormData({
        nombre: '',
        cedula: '',
        apellido_uno: '',
        apellido_dos: '',
        genero: 'mujer',
        fecha_nacimiento: '',
        telefono: '',
        telefono_emergencia: '',
        email: '',
        ciudad: '',
        sector: '',
        calle: '',
        num_casa: '',
        zip_code: '',
        titulo_historial: '',
        fecha_historial_registro: '',
        Doctor_especialista: '',
        observaciones: '',
        recetas_medicas: ''
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar el paciente');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-xl font-semibold mb-4">
        {patientToEdit ? 'Editar Paciente' : 'Registrar Nuevo Paciente'}
      </h2>
      
      <div className="mb-4">
        <label className="block mb-1">Género:</label>
        <div>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="genero"
              value="hombre"
              checked={formData.genero === 'hombre'}
              onChange={handleChange}
              className="form-radio"
            />
            <span className="ml-2">Hombre</span>
          </label>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="genero"
              value="mujer"
              checked={formData.genero === 'mujer'}
              onChange={handleChange}
              className="form-radio"
            />
            <span className="ml-2">Mujer</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="genero"
              value="otro"
              checked={formData.genero === 'otro'}
              onChange={handleChange}
              className="form-radio"
            />
            <span className="ml-2">Otro</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="nombre" className="block mb-1">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>
      
      
      <div className="mb-4">
        <label htmlFor="apellido_uno" className="block mb-1">Primer Apellido:</label>
        <input
          type="text"
          id="apellido_uno"
          name="apellido_uno"
          value={formData.apellido_uno}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="apellido_dos" className="block mb-1">Segundo Apellido:</label>
        <input
          type="text"
          id="apellido_dos"
          name="apellido_dos"
          value={formData.apellido_dos}
          onChange={handleChange}
          className="w-full border p-2"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="cedula" className="block mb-1">Cédula:</label>
        <input
          type="text"
          id="cedula"
          name="cedula"
          value={formData.cedula}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>
      
     
      
      <div className="mb-4">
        <label htmlFor="fecha_nacimiento" className="block mb-1">Fecha de Nacimiento:</label>
        <input
          type="date"
          id="fecha_nacimiento"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="telefono" className="block mb-1">Teléfono:</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="telefono_emergencia" className="block mb-1">Teléfono de Emergencia:</label>
        <input
          type="tel"
          id="telefono_emergencia"
          name="telefono_emergencia"
          value={formData.telefono_emergencia}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="ciudad" className="block mb-1">Ciudad:</label>
        <input
          type="text"
          id="ciudad"
          name="ciudad"
          value={formData.ciudad}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="sector" className="block mb-1">Sector:</label>
        <input
          type="text"
          id="sector"
          name="sector"
          value={formData.sector}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="calle" className="block mb-1">Calle:</label>
        <input
          type="text"
          id="calle"
          name="calle"
          value={formData.calle}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="num_casa" className="block mb-1">Número de Casa:</label>
        <input
          type="text"
          id="num_casa"
          name="num_casa"
          value={formData.num_casa}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="zip_code" className="block mb-1">Código Postal:</label>
        <input
          type="text"
          id="zip_code"
          name="zip_code"
          value={formData.zip_code}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="titulo_historial" className="block mb-1">Título del Historial:</label>
        <input
          type="text"
          id="titulo_historial"
          name="titulo_historial"
          value={formData.titulo_historial}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="fecha_historial_registro" className="block mb-1">Fecha de Registro del Historial:</label>
        <input
          type="date"
          id="fecha_historial_registro"
          name="fecha_historial_registro"
          value={formData.fecha_historial_registro}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="Doctor_especialista" className="block mb-1">Doctor Especialista:</label>
        <input
          type="text"
          id="Doctor_especialista"
          name="Doctor_especialista"
          value={formData.Doctor_especialista}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="observaciones" className="block mb-1">Observaciones:</label>
        <textarea
          id="observaciones"
          name="observaciones"
          value={formData.observaciones}
          onChange={handleChange}
          className="w-full border p-2"
          rows="3"
        ></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="recetas_medicas" className="block mb-1">Recetas Médicas:</label>
        <textarea
          id="recetas_medicas"
          name="recetas_medicas"
          value={formData.recetas_medicas}
          onChange={handleChange}
          className="w-full border p-2"
          rows="3"
        ></textarea>
      </div>

      <div className="mb-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {patientToEdit ? 'Actualizar Paciente' : 'Registrar Paciente'}
        </button>
      </div>
    </form>
  );
};

export default PatientForm;