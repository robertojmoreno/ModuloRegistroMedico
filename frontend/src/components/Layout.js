import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="container mx-auto px-4">
      <header className="bg-blue-500 text-white p-4 mb-4">
        <h1 className="text-2xl font-bold">Registro de Pacientes</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout; 