import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './Root/Root';
import Home from './pages/Home/Home';
import SingUp from './pages/SingUp/SingUp';


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
        element: <SingUp />
      },
    ]
  },

]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
