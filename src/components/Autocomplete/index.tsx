import styles from './Autocomplete.module.css'
import AutocompleteItem from '../AutocompleteItem';

function Autocomplete<T>({
  getSuggestionLabel,
  loading,
  onChange,
  onSelect,
  value,
  selected,
  suggestions,
}: {
  getSuggestionLabel: (suggestion: T) => string;
  loading: boolean;
  onChange: (value: string) => void;
  onSelect?: (value: string) => void;
  value: string;
  selected?: string;
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
        value={selected || value}
      />
      {value.length > 0 && (
        <div className={styles.dropdown}>
          {loading ? (
            <div>
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className={styles.skeleton}></div>
              ))}
            </div>
          ) : 
            result.length === 0 ? (
              <p>No results found</p>
            ):(
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
