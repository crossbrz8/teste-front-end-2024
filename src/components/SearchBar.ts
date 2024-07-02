// searchBar.ts
export function createSearchBar(onSearch: (query: string) => void): HTMLDivElement {
    const searchBar = document.createElement('div');
    searchBar.className = 'search-bar';
  
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Search...';
    input.className = 'border border-gray-600 py-2 px-4 rounded-full text-white border-gray-300 block w-full p-4 ps-10 bg-neutral-950 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent';  
  
    input.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement;
      onSearch(target.value);
    });
  
    searchBar.appendChild(input);
    return searchBar;
  }
  