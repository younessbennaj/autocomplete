import { ComponentProps, useState } from "react";
import { useAutocomplete } from "../../hooks/useAutocomplete";

type AutocompleteInput = ComponentProps<"input"> & {
  displayValue: (value: unknown) => string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function AutocompleteInput({
  displayValue,
  onChange,
  ...delegated
}: AutocompleteInput) {
  const { isOpen, activeOption, setIsOpen, setActiveOption, setActiveIndex } =
    useAutocomplete();
  const [value, setValue] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    onChange(event);
    setIsOpen(true);
    setActiveOption(null);
    setActiveIndex(() => -1);
  }

  return (
    <input
      {...delegated}
      aria-autocomplete="list"
      aria-controls="popover"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      type="text"
      placeholder="Search"
      onChange={handleChange}
      onFocus={(event) => {
        setIsOpen(true);
        onChange(event);
      }}
      value={activeOption ? displayValue(activeOption) : value}
      role="combobox"
    />
  );
}
