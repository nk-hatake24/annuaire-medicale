import { useRef, useEffect } from "react";

const useDebounce = (
  callback: () => void, // The callback function to be debounced
  delay: number, // The delay in milliseconds
  dependencies: any[] // The dependencies that trigger the debounce effect
): void => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(callback, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [callback, delay, ...dependencies]);
};

export default useDebounce;
