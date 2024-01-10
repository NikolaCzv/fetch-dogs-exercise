import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import DeviceDimensionsProvider from './utils/useDeviceDimensions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <DeviceDimensionsProvider>
        <App />
    </DeviceDimensionsProvider>
  </BrowserRouter>
);
