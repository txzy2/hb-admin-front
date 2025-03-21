import About from '@/pages/About';
import App from '@/App';
import Layout from '@/components/Layout';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from '@/shared/lib/ProtectedRoute';
import Register from '@/pages/Register';
import {createBrowserRouter} from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        )
      },
      {
        path: 'about',
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        )
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);
