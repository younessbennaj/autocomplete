import { useEffect } from "react";

export function useKeyPress(
  key:
    | "Enter"
    | "Escape"
    | "ArrowUp"
    | "ArrowDown"
    | "ArrowLeft"
    | "ArrowRight",
  cb: (e: KeyboardEvent) => void,
  target?: HTMLElement | null,
  ...args: []
) {
  useEffect(() => {
    const t = document.body;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === key) {
        cb(e, ...args);
      }
    };

    t.addEventListener("keydown", handleKeydown);

    return () => {
      t.removeEventListener("keydown", handleKeydown);
    };
  }, [key, cb, target, args]);
}
