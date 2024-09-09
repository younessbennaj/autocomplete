import styles from './Autocomplete.module.css'
import AutocompleteItem from '../AutocompleteItem';

function Autocomplete<T>({
  getSuggestionLabel,
  loading,
  onChange,
  onSelect,
  value,
  suggestions,
}: {
  getSuggestionLabel: (suggestion: T) => string;
  loading: boolean;
  onChange: (value: string) => void;
  onSelect?: (value: string) => void;
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

              return (
                <AutocompleteItem
                  item={item}
                  query={value}
                  onSelect={onSelect}
                />
              )
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
