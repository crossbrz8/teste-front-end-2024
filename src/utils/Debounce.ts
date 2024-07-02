// utils/debounce.ts
export function debounce(func: (...args: any[]) => void, wait: number) {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    return (...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, wait);
    };
  }
  