import { useRef } from "react";
import textSearch from "../../utils/textSearch";
import { useKeyPress } from "../../hooks/useKeyPress";
import styles from './AutocompleteItem.module.css'

function AutocompleteItem({item, query, onSelect}: {
    item: string,
    query: string,
    onSelect?: (value: string) => void;
  }) {
    const parts = textSearch(item, query);
    const ref = useRef<HTMLLIElement>(null);
  
    useKeyPress('Enter', () => onSelect ? onSelect(item) : null, ref.current)
  
    return (
      <li
      ref={ref}
      className={styles.autocompleteItem}
      tabIndex={0}
      onClick={() => onSelect ? onSelect(item) : null}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onSelect ? onSelect(item) : null
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
    )
  }

export default AutocompleteItem;