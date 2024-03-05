import React from "react";

function useLocalStorage(key: string, initialValue: any) {
  const isWindowDefined = typeof window !== "undefined";

  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      if (isWindowDefined) {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      if (isWindowDefined) {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
