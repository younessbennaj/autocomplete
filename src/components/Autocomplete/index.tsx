import styles from "./Autocomplete.module.css";
import AutocompleteItem from "../AutocompleteItem";
import { Search } from "react-feather";

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
            onChange(event.target.value);
          }}
          placeholder={placeholder}
          type="text"
          value={selected || value}
        />
      </div>
      {value.length > 0 && (
        <div className={styles.dropdown}>
          {loading ? (
            <div>
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className={styles.skeleton}></div>
              ))}
            </div>
          ) : result.length === 0 ? (
            <p>No results found</p>
          ) : (
            <ul>
              {result.map((item) => {
                return (
                  <AutocompleteItem
                    item={item}
                    query={value}
                    onSelect={onSelect}
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
