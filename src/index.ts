import { Navbar } from './components/Navbar.ts';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  root?.appendChild(Navbar);
});
