import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './Root/Root';
import Home from './pages/Home/Home';
import SingUp from './pages/SingUp/SingUp';
import SingIn from './pages/SingIn/SingIn';
import AuthProvider from './Provider/AuthProvider';
import Products from './pages/Products/Products';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/singup',
        element: <SingUp />
      },
      {
        path: '/singin',
        element: <SingIn />
      },
      {
        path: '/products',
        element: <Products />
      },
    ]
  },

]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
