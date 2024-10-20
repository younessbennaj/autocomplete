import styles from "./Autocomplete.module.css";
import AutocompleteItem from "../AutocompleteItem";
import { Search } from "react-feather";
import { useKeyPress } from "../../hooks/useKeyPress";
import { useEffect, useRef, useState } from "react";
import FocusLock from "react-focus-lock";

function Autocomplete<T>({
  getSuggestionLabel,
  loading,
  label,
  onChange,
  onSelect,
  placeholder = "Search",
  value,
  selected,
  suggestions,
}: {
  getSuggestionLabel: (suggestion: T) => string;
  loading: boolean;
  label?: string;
  onChange: (value: string) => void;
  onSelect?: (value: string) => void;
  placeholder?: string;
  value: string;
  selected?: string;
  suggestions: T[];
}) {
  const result = suggestions.map(getSuggestionLabel);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook pour détecter les clics en dehors de l'input et du dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Vérifie que containerRef.current n'est pas null avant d'utiliser contains
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Ferme le dropdown si on clique en dehors
      }
    };

    // Ajouter l'écouteur d'événement
    document.addEventListener("mousedown", handleClickOutside);

    // Nettoyer l'écouteur d'événement lorsque le composant est démonté
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useKeyPress("Escape", () => {
    setIsOpen(false);
    inputRef.current?.blur();
  });

  // Attempt with arrow navigation to improve

  // useKeyPress("ArrowDown", () => {
  //   // if current active element is input, then focus on the first item
  //   const activeElement = document.activeElement as HTMLElement;
  //   if (activeElement === inputRef.current) {
  //     const firstElement = containerRef.current?.querySelector("li");
  //     if (firstElement) {
  //       firstElement.focus();
  //     }
  //   } else {
  //     const nextElement = activeElement.nextElementSibling as HTMLElement;
  //     if (nextElement) {
  //       nextElement.focus();
  //     }
  //   }
  // });

  // useKeyPress("ArrowUp", () => {
  //   const activeElement = document.activeElement as HTMLElement;
  //   const prevElement = activeElement.previousElementSibling as HTMLElement;

  //   if (prevElement) {
  //     prevElement.focus();
  //   } else {
  //     inputRef.current?.focus();
  //   }
  // });

  return (
    <FocusLock disabled={!isOpen} returnFocus autoFocus={isOpen}>
      <div className={styles.wrapper} ref={containerRef}>
        {label ? (
          <label className={styles.label} htmlFor="">
            {label}
          </label>
        ) : null}
        <div className={styles.inputWrapper}>
          <Search
            style={{
              color: "#6b7280",
            }}
            size={18}
          />
          <input
            autoFocus
            className={styles.input}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.value.length > 0) {
                setIsOpen(true);
              } else {
                setIsOpen(false);
              }
              onChange(event.target.value);
            }}
            onFocus={() => {
              if (value.length > 0) {
                setIsOpen(true);
              }
            }}
            placeholder={placeholder}
            type="text"
            ref={inputRef}
            value={selected || value}
          />
        </div>
        {isOpen && (
          <div className={styles.dropdown}>
            {loading ? (
              <div className={styles.skeletonWrapper}>
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "12px 16px",
                    }}
                  >
                    <div className={styles.skeleton}></div>
                  </div>
                ))}
              </div>
            ) : result.length === 0 ? (
              <div>
                <p>No results found</p>
              </div>
            ) : (
              <ul>
                {result.map((item, index) => {
                  return (
                    <AutocompleteItem
                      key={index}
                      index={index}
                      item={item}
                      query={value}
                      onSelect={() => {
                        if (onSelect) {
                          onSelect(item);
                        }

                        setIsOpen(false);
                      }}
                    />
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </FocusLock>
  );
}

export default Autocomplete;
