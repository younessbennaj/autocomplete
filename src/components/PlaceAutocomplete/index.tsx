import { useState } from "react";
import Autocomplete from "../Autocomplete";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";

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
  const debouncedSearch = useDebounce(search, 300);

  const { data: suggestions, isLoading } = useQuery({
    enabled: debouncedSearch.length > 3,
    queryKey: ["query", debouncedSearch],
    queryFn: () => fetchAddresses(debouncedSearch, 5),
    staleTime: 12 * 60 * 60 * 1000, // Keeps data fresh for 12 hours
    gcTime: 24 * 60 * 60 * 1000, // Caches data for 24 hours before removal
    refetchOnWindowFocus: false, // Prevents refetching when switching window focus
    refetchOnReconnect: false, // Prevents refetching on network reconnect
  });

  function handleSearchChange(value: string) {
    setSelected("");
    setSearch(value);
  }
  return (
    <Autocomplete<string>
      getSuggestionLabel={(suggestion: string) => suggestion}
      loading={isLoading}
      onChange={handleSearchChange}
      onSelect={(value) => {
        setSearch("");
        setSelected(value);
      }}
      label="Search for an address"
      placeholder="7 rue de la paix, Paris"
      selected={selected}
      value={search}
      suggestions={suggestions ? suggestions : []}
    />
  );
}

export default PlaceAutocomplete;
