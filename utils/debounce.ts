function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  waitForMs: number
){
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), waitForMs);
  };
}

export {debounce};