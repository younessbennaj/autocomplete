import { ComponentProps } from "react";
import { useAutocomplete } from "../Autocomplete";

type AutocompleteOptionsProps = ComponentProps<"ul"> & {
  children: React.ReactNode;
};

export function AutocompleteOptions({
  children,
  ...delegated
}: AutocompleteOptionsProps) {
  const { isOpen } = useAutocomplete();
  if (!isOpen) {
    return null;
  }
  return <ul {...delegated}>{children}</ul>;
}
