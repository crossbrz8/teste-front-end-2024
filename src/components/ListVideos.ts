import { createYouTubePlayer } from '../utils/YouTubePlayer';

interface Video {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description?: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
}

export function listVideos(videos: Video[], container: HTMLDivElement) {
  container.innerHTML = ''; // Clear previous results

  if (!videos || videos.length === 0) {
    container.innerHTML = '<p>No videos found.</p>';
    return;
  }

  videos.forEach((video) => {
    const videoElement = document.createElement('div');

    videoElement.className = 'video rounded-lg shadow-lg text-white max-w-sm hover:scale-105 transition-all duration-200 ease-in-out';

    const thumbnail = document.createElement('img');
    thumbnail.src = video.snippet.thumbnails.default.url;
    thumbnail.alt = video.snippet.title;
    thumbnail.className = 'w-full h-auto cursor-pointer';
    thumbnail.addEventListener('click', () => {
      createYouTubePlayer(video.id.videoId);
    });
    
    const favoriteButton = document.createElement('button');
    favoriteButton.addEventListener('click', () => {
      const storedFavorites = localStorage.getItem('favorites');

      if (storedFavorites) {
        const favorites = JSON.parse(storedFavorites);
        if (favorites.includes(video.id.videoId)) {
          favorites.splice(favorites.indexOf(video.id.videoId), 1);
          favoriteButton.classList.remove('bg-red-400');
        } else {
          favorites.push(video.id.videoId);
          favoriteButton.classList.add('bg-red-400');
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesList();
      } else {
        const favorites = [video.id.videoId];
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesList();
      }
    });

    favoriteButton.className = 'size-10 mr-auto text-white rounded-full p-2 cursor-pointer';
    favoriteButton.innerHTML = '<img src="/favorites.svg" alt="favorite" class="size-6">';

    const title = document.createElement('h3');
    title.className = 'text-md font-medium my-2 px-4';
    title.textContent = video.snippet.title;

    // verify if the video is a favorite
    
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      if (favorites.includes(video.id.videoId)) {
        favoriteButton.classList.add('bg-red-400');
      }
    }

    videoElement.appendChild(thumbnail);
    videoElement.appendChild(title);
    videoElement.appendChild(favoriteButton);
    container.appendChild(videoElement);
  });
}

function updateFavoritesList() {
  const favoritesList = document.querySelector<HTMLDivElement>('#favorites-list')!;
  const storedFavorites = localStorage.getItem('favorites');
  favoritesList.innerHTML = '';

  if (storedFavorites) {
    const favoriteIds = JSON.parse(storedFavorites);
    favoriteIds.forEach((id: string) => {
      const favoriteItem = document.createElement('div');
      favoriteItem.className = 'favorite-item text-white cursor-pointer';
      favoriteItem.textContent = `Favorite Video ${id}`;
      favoriteItem.addEventListener('click', () => {
        createYouTubePlayer(id);
      });
      favoritesList.appendChild(favoriteItem);
    });
  }
}
