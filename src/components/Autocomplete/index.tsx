import styles from "./Autocomplete.module.css";
import AutocompleteItem from "../AutocompleteItem";
import { Search } from "react-feather";
import { useKeyPress } from "../../hooks/useKeyPress";
import { useRef, useState } from "react";

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

  useKeyPress("Escape", () => {
    setIsOpen(false);
    inputRef.current?.blur();
  });

  return (
    <div className={styles.wrapper}>
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
                  style={{
                    padding: "12px 16px",
                  }}
                >
                  <div key={index} className={styles.skeleton}></div>
                </div>
              ))}
            </div>
          ) : result.length === 0 ? (
            <div>
              <p>No results found</p>
            </div>
          ) : (
            <ul>
              {result.map((item) => {
                return (
                  <AutocompleteItem
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
  );
}

export default Autocomplete;
