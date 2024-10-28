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
  const result = suggestions.map(getSuggestionLabel) || [];
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useKeyPress("Escape", () => {
    setActiveIndex(-1);
    setIsOpen(false);
  });

  useKeyPress("ArrowDown", () => {
    if (result.length > 0) {
      setActiveIndex((prevIndex) => (prevIndex + 1) % result.length);
      setIsOpen(true);
    }
  });

  useKeyPress("ArrowUp", () => {
    if (result.length > 0) {
      setActiveIndex((prevIndex) =>
        prevIndex <= 0 ? result.length - 1 : prevIndex - 1
      );
      setIsOpen(true);
    }
  });

  useKeyPress("Enter", () => {
    if (activeIndex >= 0 && activeIndex < result.length) {
      const selectedItem = result[activeIndex];
      if (onSelect) {
        onSelect(selectedItem);
      }
      setIsOpen(false);
    }
  });

  return (
    <FocusLock disabled={!isOpen} returnFocus autoFocus={isOpen}>
      <div className={styles.wrapper} ref={containerRef}>
        {label ? (
          <label className={styles.label} htmlFor="search">
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
            aria-activedescendant={
              isOpen && activeIndex >= 0 ? `option-${activeIndex}` : ""
            }
            aria-autocomplete="list"
            aria-controls="popover"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-label={label}
            autoFocus
            className={styles.input}
            id="search"
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
            ref={inputRef}
            role="combobox"
            type="text"
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
              <ul id="popover" role="listbox">
                {result.map((item, index) => {
                  return (
                    <AutocompleteItem
                      id={`option-${index}`}
                      isActive={index === activeIndex ? true : false}
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
