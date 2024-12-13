import { ComponentProps, useState } from "react";
import { useAutocomplete } from "../Autocomplete";

type AutocompleteInput = ComponentProps<"input"> & {
  displayValue: (value: unknown) => string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function AutocompleteInput({
  displayValue,
  onChange,
  ...delegated
}: AutocompleteInput) {
  const { activeOption, setIsOpen, setActiveOption } = useAutocomplete();
  const [value, setValue] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    onChange(event);
    setIsOpen(true);
    setActiveOption(null);
  }

  return (
    <input
      {...delegated}
      type="text"
      placeholder="Search"
      onChange={handleChange}
      onFocus={() => setIsOpen(true)}
      value={activeOption ? displayValue(activeOption) : value}
    />
  );
}
