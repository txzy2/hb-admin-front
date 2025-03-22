import '@radix-ui/themes/styles.css';
import '@radix-ui/themes/layout/tokens.css';
import '@radix-ui/themes/layout/components.css';
import '@radix-ui/themes/layout/utilities.css';
import './assets/styles/index.css';

import {RouterProvider} from 'react-router-dom';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {router} from '@/router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
