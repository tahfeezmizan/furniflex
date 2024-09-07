import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import SingIn from './pages/SingIn/SingIn';
import SingUp from './pages/SingUp/SingUp';
import AuthProvider from './Provider/AuthProvider';
import Root from './Root/Root';
import { ToastContainer } from 'react-toastify';
import CheckOut from './pages/CheckOut/CheckOut';
import 'react-toastify/dist/ReactToastify.css';

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
        path: '/checkout',
        element: <CheckOut />
      },
      {
        path: '/products',
        element: <Products />,
        loader: () => fetch('http://localhost:5000/productsCount')
      },
    ]
  },

]);

const queryClient = new QueryClient()



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
