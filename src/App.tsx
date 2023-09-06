import React from 'react';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Outlet />
    </AuthProvider>
  );
}

export default App;

