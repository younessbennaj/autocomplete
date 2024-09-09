import { useEffect } from "react";

export function useKeyPress(key: string, cb: () => void, target: HTMLElement | null, ...args: []) {
    useEffect(() => {
      const t = target ? target : document.body;
  
      const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === key && document.activeElement === t) {
          cb(...args);
        }
      };
  
      t.addEventListener('keydown', handleKeydown);
  
      return () => {
        t.removeEventListener('keydown', handleKeydown);
      };
    }, [key, cb, target, ...args]);
  }