import './style.css';
import { createSearchBar } from './components/SearchBar';
import { getSearchs, nextPageToken } from './utils/Request';
import { listVideos } from './components/ListVideos';
import { debounce } from './utils/Debounce';
import { createSideBar } from './components/SideMenu';
import { listFavoriteVideos, getFavoriteVideos } from './components/Favorites';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="flex">
    <div id="sidebar-container" class="border-r border-white/20 border-dotted"></div>
    <div class="flex flex-col flex-grow lg:max-w-6xl lg:mx-auto px-4 lg:px-0">
      <div class="w-full py-1 flex items-center justify-center">
        <button onclick="window.location.reload()" class="flex items-center gap-2 mt-3 cursor-pointer">
          <img src="/youtube.png" alt="logo" class="w-8 h-8 object-contain" />
          <h1 class="text-md text-white font-bold">YouTube</h1>
        </button>
        <form class="flex-grow">
          <div class="max-w-md mx-auto" id="search-bar-container"></div>
        </form>
      </div> 
      <div id="video-list-container" class="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4"></div>
      <dialog class="backdrop-blur-lg bg-transparent relative text-white" id="videoDialog">
        <div id="closeDialog" class="backdrop-blur-lg w-screen h-screen flex items-center justify-center bg-transparent">
          <div class="mx-auto min-w-[310px] max-w-[800px] border rounded-3xl" id="player"></div>
        </div>
      </dialog>
    </div>
  </div>
`;

const searchBarContainer = document.querySelector<HTMLDivElement>('#search-bar-container')!;
const videoListContainer = document.querySelector<HTMLDivElement>('#video-list-container')!;
const sidebarContainer = document.querySelector<HTMLDivElement>('#sidebar-container')!;

const onSearch = debounce(async (query: string) => {
  console.log('Search query:', query);
  try {
    const data = await getSearchs(query);
    console.log('Search data:', data);
    videoListContainer.innerHTML = ''; // Clear previous results
    listVideos(data.items, videoListContainer);
  } catch (error) {
    console.error('Error during search:', error);
  }
}, 300);

const searchBar = createSearchBar(onSearch);
searchBarContainer.appendChild(searchBar);

const showHome = async () => {
  try {
    const data = await getSearchs();
    videoListContainer.innerHTML = ''; // Clear previous results
    listVideos(data.items, videoListContainer);
  } catch (error) {
    console.error('Error fetching initial search results:', error);
    // videoListContainer.innerHTML = `<p>Error fetching initial search results: ${error.message}</p>`;
  }
};



const showFavorites = async () => {
  const favoriteVideos = await getFavoriteVideos();
  videoListContainer.innerHTML = ''; // Clear previous results
  listFavoriteVideos(favoriteVideos, videoListContainer);
};

const sideBar = createSideBar(showHome,showFavorites);
sidebarContainer.appendChild(sideBar);

showHome(); // Load home videos on initial load

// Infinite scrolling
window.addEventListener('scroll', async () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && nextPageToken) {
    try {
      const data = await getSearchs(undefined, nextPageToken);
      listVideos(data.items, videoListContainer);
    } catch (error) {
      console.error('Error fetching more search results:', error);
    }
  }
});
