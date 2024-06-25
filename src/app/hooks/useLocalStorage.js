import { useState, useEffect } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const storedValue = window.localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}
