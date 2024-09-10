import React, { useState } from 'react';
import Layout from './components/Layout';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';

function App() {
  const [updateList, setUpdateList] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState(null);

  const handlePatientAdded = () => {
    setUpdateList(prev => !prev);
  };

  const handlePatientUpdated = () => {
    setUpdateList(prev => !prev);
    setPatientToEdit(null);
  };

  const handleEditPatient = (patient) => {
    setPatientToEdit(patient);
  };

  return (
    <Layout>
      <PatientForm 
        patientToEdit={patientToEdit} 
        onPatientAdded={handlePatientAdded} 
        onPatientUpdated={handlePatientUpdated} 
      />
      <PatientList key={updateList} onEditPatient={handleEditPatient} />
    </Layout>
  );
}

export default App;