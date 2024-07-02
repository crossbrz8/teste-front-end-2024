let nextPageToken: string | null = null;

async function getSearchs(query: string = 'How to learn react', pageToken: string | null = null) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const maxResults = 10;
  const cacheKey = `youtube_search_${query}_${pageToken || 'initial'}`;
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  url.searchParams.append('part', 'snippet');
  url.searchParams.append('q', query);
  url.searchParams.append('maxResults', maxResults.toString());
  url.searchParams.append('key', apiKey);
  if (pageToken) {
    url.searchParams.append('pageToken', pageToken);
  }

  console.log('Request URL:', url.toString());

  const response = await fetch(url.toString());
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`HTTP error! status: ${response.status}`, errorText);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  localStorage.setItem(cacheKey, JSON.stringify(data));
  nextPageToken = data.nextPageToken || null;
  return data;
}

export { getSearchs, nextPageToken };
