import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';

const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
const isReload = navigation?.type === 'reload';

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

if (isReload && window.location.hash) {
  history.replaceState(history.state, '', `${window.location.pathname}${window.location.search}`);
}

const resetInitialScroll = () => {
  if (isReload || !window.location.hash) {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }
};

resetInitialScroll();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

requestAnimationFrame(() => requestAnimationFrame(resetInitialScroll));
window.addEventListener('pageshow', resetInitialScroll, { once: true });
