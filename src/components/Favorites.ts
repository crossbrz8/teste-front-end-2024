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

export function listFavoriteVideos(videos: Video[], container: HTMLDivElement) {
  container.innerHTML = ''; // Clear previous results

  if (!videos || videos.length === 0) {
    container.innerHTML = '<p class="text-white w-full">No favorite videos found.</p>';
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

    const title = document.createElement('h3');
    title.className = 'text-md font-medium my-2 px-4';
    title.textContent = video.snippet.title;
    videoElement.appendChild(thumbnail);
    videoElement.appendChild(title);
    container.appendChild(videoElement);
  });
}

export function getFavoriteVideos(): Video[] {
  const storedFavorites = localStorage.getItem('favorites');
  if (storedFavorites) {
    const favoriteIds = JSON.parse(storedFavorites);
    const favoriteVideos: Video[] = favoriteIds.map((id: string,) => ({
      id: { videoId: id },
      snippet: {
        title: `Favorite Video ${id}`,
        thumbnails: {
          default: {
            url: `https://img.youtube.com/vi/${id}/default.jpg`,
          },
        },
      },
    }));
    return favoriteVideos;
  }
  return [];
}