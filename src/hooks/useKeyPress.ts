import { useEffect } from "react";

export function useKeyPress(
  key: "Enter",
  cb: (e: KeyboardEvent) => void,
  target: HTMLElement | null,
  ...args: []
) {
  useEffect(() => {
    const t = target ? target : document.body;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === key && document.activeElement === t) {
        cb(e, ...args);
      }
    };

    t.addEventListener("keydown", handleKeydown);

    return () => {
      t.removeEventListener("keydown", handleKeydown);
    };
  }, [key, cb, target, args]);
}
