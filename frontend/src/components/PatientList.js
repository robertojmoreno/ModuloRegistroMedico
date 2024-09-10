import React, { useState, useEffect } from 'react';

const PatientList = ({ onEditPatient }) => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/pacientesRegistro');
        if (!response.ok) {
          throw new Error('Error al obtener la lista de pacientes');
        }
        const data = await response.json();
        setPatients(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los pacientes. Por favor, intenta de nuevo.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchPatients();
    }, []);
  
    if (loading) return <p>Cargando pacientes...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Lista de Pacientes</h2>
      {patients.length === 0 ? (
        <p>No hay pacientes registrados.</p>
      ) : (
        <ul>
          {patients.map((patient) => (
            <li key={patient.id} className="mb-2">
              {patient.nombre} {patient.apellido_uno} {patient.apellido_dos}
              <button 
                onClick={() => onEditPatient(patient)} 
                className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
      )}
      <button 
        onClick={fetchPatients} 
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Actualizar Lista
      </button>
    </div>
  );
};

export default PatientList;