import React from 'react';
import Navbar from './components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { ChatProvider } from './context/ChatProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChatProvider>
          <Navbar />
          <Outlet />
        </ChatProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
