export function createSideBar(showHome: () => void, showFavorites: () => void) {
  const sideBar = document.createElement('div');
  sideBar.className = 'sidebar';

  sideBar.innerHTML = `
  <div class="">
    <button id="hamburger" class="block md:hidden p-4 text-white text-xl">
      ☰ 
    </button>
    <nav id="menu" class="hidden md:flex flex-col md:items-start md:justify-between">
      <a href="#" id="home-link" class="menu-item p-4 block md:inline-block">Home</a>
      <a href="#" id="favorites-link" class="menu-item p-4 md:inline-block block mt-2 md:mt-0">Favorites</a>
    </nav>
  </div>
  `;

  const hamburger = sideBar.querySelector<HTMLButtonElement>('#hamburger')!;
  const menu = sideBar.querySelector<HTMLDivElement>('#menu')!;
  const homeLink = sideBar.querySelector<HTMLAnchorElement>('#home-link')!;
  const favoritesLink = sideBar.querySelector<HTMLAnchorElement>('#favorites-link')!;

  hamburger.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  homeLink.addEventListener('click', (event) => {
    event.preventDefault();
    showHome();
    menu.classList.add('hidden');
  });

  favoritesLink.addEventListener('click', (event) => {
    event.preventDefault();
    showFavorites();
    menu.classList.add('hidden');
  });

  return sideBar;
}
