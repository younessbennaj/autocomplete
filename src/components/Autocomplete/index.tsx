import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import styles from './Autocomplete.module.css'

function Autocomplete<T>({
  getSuggestionLabel,
  loading,
  onChange,
  onSuggestionClick,
  value,
  suggestions,
}: {
  getSuggestionLabel: (suggestion: T) => string;
  loading: boolean;
  onChange: (value: string) => void;
  onSuggestionClick?: (value: string) => void;
  value: string;
  suggestions: T[];
}) {
  const result = suggestions.map(getSuggestionLabel);
  return (
    <div className={styles.wrapper}>
      <input
        autoFocus
        className={styles.input}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event.target.value);
        }}
        type="text"
        value={value}
      />
      {value ? (
        <div  className={styles.dropdown}>
        {!loading ? (
          <ul>
            {result.map((item) => {
              const matches = match(item, value, { insideWords: true });
              const parts = parse(item, matches);
  
              return (
                <li
                  className={styles.dropdownItem}
                  tabIndex={0}
                  onClick={() => {
                    if (onSuggestionClick) {
                      onSuggestionClick(item);
                    }
                  }}
                  onKeyDown={(e: React.KeyboardEvent<HTMLLIElement>) => {
                    if (e.key === "Enter") {
                      if (onSuggestionClick) {
                        onSuggestionClick(item);
                      }
                    }
                  }}
                >
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                </li>
              );
            })}
          </ul>
  
        ) : (
          <p>Loading...</p>
        )}
        </div>
      ) : null}
    </div>
  );
}

export default Autocomplete;
