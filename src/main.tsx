import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// Fontes servidas pelo próprio site (só o subconjunto latin e os pesos em uso):
// sem a folha do Google Fonts bloqueando a primeira pintura.
import '@fontsource/ibm-plex-sans/latin-400.css';
import '@fontsource/ibm-plex-sans/latin-500.css';
import '@fontsource/ibm-plex-sans/latin-600.css';
import '@fontsource/ibm-plex-sans/latin-700.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Elemento #root nao encontrado no documento');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
