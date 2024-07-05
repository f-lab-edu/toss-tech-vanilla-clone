const Navbar = document.createElement('div');
Navbar.classList.add('navbar-container');

const contentContainer = document.createElement('div');
contentContainer.classList.add('navbar-content-container');

const logo = document.createElement('img');
logo.classList.add('logo');
logo.src = './src/assets/logo.png';
logo.alt = 'toss logo image';

const titleImg = document.createElement('img');
titleImg.classList.add('title-img');
titleImg.src = './src/assets/title.png';
titleImg.alt = 'toss tech title image';

contentContainer.appendChild(logo);
contentContainer.appendChild(titleImg);
Navbar.appendChild(contentContainer);
export { Navbar };
