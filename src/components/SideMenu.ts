export function createSideBar(showHome: () => void,showFavorites: () => void) {
  const sideBar = document.createElement('div');
  sideBar.className = 'sidebar';

  sideBar.innerHTML = `
    <nav class="flex flex-col p-4 bg-neutral-950 text-white h-full w-14 lg:w-48 border-r border-white/40 fixed z-20">
      <a href="#" id="home-link" class="py-2 px-4 text-sm hover:bg-gray-700 rounded">Home</a>
      <div id="favorites-section" class="mt-4">
        <a href="#" id="favorites-link" class="py-2 text-sm px-4 hover:bg-gray-700 rounded">Favorites</a>
      </div>
    </nav>
  `;

  const homeLink = sideBar.querySelector<HTMLAnchorElement>('#home-link')!;
  homeLink.addEventListener('click', (event) => {
    event.preventDefault();
    showHome();
  });

  const favoritesLink = sideBar.querySelector<HTMLAnchorElement>('#favorites-link')!;
  favoritesLink.addEventListener('click', (event) => {
    event.preventDefault();
    showFavorites();
  });

  return sideBar;
}