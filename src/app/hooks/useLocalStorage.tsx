"use client";
import { useEffect, useState } from 'react';

const useLocalStorage = (key: string) => {
  // State to store the value
  const [value, setValue] = useState<boolean | null>(() => {
    // Retrieve value from local storage based on the provided key
    let storedValue = null;
    if ( typeof window !== "undefined"){
        storedValue = localStorage.getItem(key);
    }
    return storedValue ? JSON.parse(storedValue) : null;
  });

  // Update local storage when the value changes
  useEffect(() => {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return value;
};

export default useLocalStorage;
