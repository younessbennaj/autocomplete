import { useContext } from "react";
import { AutocompleteContext } from "../components/Autocomplete";

export function useAutocomplete() {
  return useContext(AutocompleteContext);
}
