import { createContext, useEffect, useRef, useState } from "react";
import { useKeyPress } from "../../hooks/useKeyPress";

export const AutocompleteContext = createContext<{
  activeIndex: number;
  activeOption: unknown;
  onChange: (value: unknown) => void;
  value: unknown;
  onClose?: () => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setActiveIndex: (value: (prevIndex: number) => number) => void;
  setActiveOption: (value: unknown) => void;
}>({
  activeIndex: 0,
  activeOption: null,
  onChange: () => {},
  value: null,
  onClose: () => {},
  isOpen: false,
  setIsOpen: () => {},
  setActiveIndex: () => {},
  setActiveOption: () => {},
});

export function Autocomplete({
  className,
  children,
  onChange,
  value,
  onClose,
}: {
  className: string;
  children: React.ReactNode;
  onChange: (value: unknown) => void;
  value: unknown;
  onClose?: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [activeOption, setActiveOption] = useState<unknown>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useKeyPress("Escape", () => {
    setActiveIndex(-1);
    setIsOpen(false);
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        if (onClose) {
          onClose();
        }
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <AutocompleteContext.Provider
      value={{
        activeIndex,
        activeOption,
        isOpen,
        setIsOpen,
        onChange,
        value,
        onClose,
        setActiveOption,
        setActiveIndex,
      }}
    >
      <div ref={containerRef} className={className}>
        {children}
      </div>
    </AutocompleteContext.Provider>
  );
}
