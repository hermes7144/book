import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';
import AllBooks from './pages/AllBooks';
import NewBook from './pages/NewBook';
import ProtectedRoute from './pages/ProtectedRoute';
import Neighborhood from './pages/Neighborhood';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import BookChat from './pages/BookChat';
import BookChats from './pages/BookChats';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <AllBooks /> },
      { path: '/books', element: <Books /> },
      {
        path: '/books/new',
        element: (
          <ProtectedRoute requireAdmin>
            <NewBook />
          </ProtectedRoute>
        ),
      },
      { path: '/books/:id', element: <BookDetail /> },
      {
        path: '/neighborhood',
        element: (
          <ProtectedRoute>
            <Neighborhood />
          </ProtectedRoute>
        ),
      },
      {
        path: '/chats/:id',
        element: (
          <ProtectedRoute>
            <BookChats />
          </ProtectedRoute>
        ),
      },
      {
        path: '/chat/:id',
        element: (
          <ProtectedRoute>
            <BookChat />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
