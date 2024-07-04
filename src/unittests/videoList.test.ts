import { listFavoriteVideos,getFavoriteVideos} from '../components/Favorites';
import { JSDOM } from 'jsdom';
import "../global";

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

describe('Video List Functions', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><body></body>');
    (global as any).document = dom.window.document;
    (global as any).window = dom.window;

    container = document.createElement('div');
    document.body.appendChild(container);

    // Mock localStorage
    (global as any).localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };
  });

  afterEach(() => {
    document.body.removeChild(container);
    jest.clearAllMocks();
  });

  test('should display "No favorite videos found." when there are no videos', () => {
    listFavoriteVideos([], container);
    expect(container.innerHTML).toBe('<p class="text-white w-full">No favorite videos found.</p>');
  });

  test('should display favorite videos', () => {
    const videos: Video[] = [
      {
        id: { videoId: '123' },
        snippet: {
          title: 'Test Video 123',
          thumbnails: {
            default: {
              url: 'https://img.youtube.com/vi/123/default.jpg',
            },
          },
        },
      },
    ];

    listFavoriteVideos(videos, container);
    expect(container.innerHTML).toContain('Test Video 123');
    expect(container.querySelector('img')?.src).toBe('https://img.youtube.com/vi/123/default.jpg');
  });

  test('should get favorite videos from localStorage', () => {
    const favoriteIds = ['123', '456'];
    (global.localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(favoriteIds));

    const favoriteVideos = getFavoriteVideos();
    expect(favoriteVideos).toHaveLength(2);
    expect(favoriteVideos[0].id.videoId).toBe('123');
    expect(favoriteVideos[1].id.videoId).toBe('456');
  });

  test('should return an empty array if no favorites in localStorage', () => {
    (global.localStorage.getItem as jest.Mock).mockReturnValue(null);

    const favoriteVideos = getFavoriteVideos();
    expect(favoriteVideos).toHaveLength(0);
  });
});