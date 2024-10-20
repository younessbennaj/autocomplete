import { useRef } from "react";
import textSearch from "../../utils/textSearch";
import styles from "./AutocompleteItem.module.css";

function AutocompleteItem({
  item,
  query,
  onSelect,
}: {
  index: number;
  item: string;
  query: string;
  onSelect?: (value: string) => void;
}) {
  const parts = textSearch(item, query);
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      className={styles.autocompleteItem}
      tabIndex={0}
      onClick={() => {
        if (onSelect) {
          onSelect(item);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          if (onSelect) {
            onSelect(item);
          }
        }
      }}
    >
      {parts.map((part, index) => (
        <span
          key={index}
          style={{
            borderRadius: "0.25rem",
            backgroundColor: part.highlight ? "#dbeafe" : "transparent",
            color: part.highlight ? "#2563eb" : "inherit",
          }}
        >
          {part.text}
        </span>
      ))}
    </li>
  );
}

export default AutocompleteItem;
