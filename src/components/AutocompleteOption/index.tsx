import { ComponentProps } from "react";
import { useAutocomplete } from "../Autocomplete";

type AutocompleteOptionsProps = ComponentProps<"li"> & {
  className: string;
  children: React.ReactNode;
  optionValue: unknown;
};

export function AutocompleteOption({
  className,
  children,
  optionValue,
}: AutocompleteOptionsProps) {
  const { onChange, onClose, setIsOpen, setActiveOption } = useAutocomplete();
  return (
    <li
      className={className}
      onClick={() => {
        setActiveOption(optionValue);
        setIsOpen(false);
        onChange(optionValue);
        onClose();
      }}
    >
      {children}
    </li>
  );
}
