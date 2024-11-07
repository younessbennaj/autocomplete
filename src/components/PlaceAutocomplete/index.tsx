import { useMemo, useState } from "react";
import Autocomplete from "../Autocomplete";
import { debounce } from "lodash";

type Address = {
  address: string;
  id: string;
};

interface AddressFeature {
  properties: {
    label: string;
  };
}

interface ApiResponse {
  features: AddressFeature[];
}

// Fonction pour récupérer les données de l'API Adresse
async function fetchAddresses(
  query: string,
  limit: number = 5
): Promise<string[]> {
  const response = await fetch(
    `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
      query
    )}&limit=${limit}&autocomplete=1`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch addresses");
  }

  const data: ApiResponse = await response.json();
  return data.features.map((feature) => feature.properties.label); // Récupère uniquement les labels des adresses
}

function PlaceAutocomplete() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const [suggestions, setSuggestions] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedFetchSuggestions = useMemo(
    () =>
      debounce((value: string) => {
        setLoading(true);
        fetchAddresses(value).then((suggestions) => {
          console.log(suggestions);
          setSuggestions(
            suggestions.map((label, index) => {
              return {
                address: label,
                id: index.toString(),
              };
            })
          );
          setLoading(false);
        });
        // add finally and catch to handle errors
      }, 500),
    []
  );

  function handleSearchChange(value: string) {
    setSelected("");
    setSearch(value);
    if (value.length > 3) {
      setLoading(true);
      debouncedFetchSuggestions(value);
    }
  }
  return (
    <Autocomplete
      getSuggestionLabel={(suggestion: Address) => suggestion.address}
      loading={loading}
      onChange={handleSearchChange}
      onSelect={(value) => {
        setSearch("");
        setSuggestions([]);
        setSelected(value);
      }}
      label="Search for an address"
      placeholder="7 rue de la paix, Paris"
      selected={selected}
      value={search}
      suggestions={suggestions}
    />
  );
}

export default PlaceAutocomplete;
