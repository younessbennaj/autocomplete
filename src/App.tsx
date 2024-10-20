import { useMemo, useState } from "react";
import "./App.css";
import DATA from "./data.json";
import Autocomplete from "./components/Autocomplete";
import { debounce } from "lodash";

type User = {
  firstName: string;
  id: string;
};

function fetchSuggestionsByProductName(search: string): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // limit to 10 suggestions
      const suggestions = search
        ? DATA.result
            .filter((item) => {
              return item.firstName
                .toLowerCase()
                .includes(search.toLowerCase());
            })
            .slice(0, 10)
        : [];
      resolve(suggestions);
    }, 1000);
  });
}

function App() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedFetchSuggestions = useMemo(
    () =>
      debounce((value: string) => {
        setLoading(true);
        fetchSuggestionsByProductName(value).then((suggestions) => {
          setSuggestions(suggestions);
          setLoading(false);
        });
        // add finally and catch to handle errors
      }, 500),
    []
  );

  function handleSearchChange(value: string) {
    setSelected("");
    setSearch(value);
    setLoading(true);
    debouncedFetchSuggestions(value);
  }

  return (
    <>
      <h1>Autocomplete</h1>
      <Autocomplete
        getSuggestionLabel={(suggestion: User) => suggestion.firstName}
        loading={loading}
        onChange={handleSearchChange}
        onSelect={(value) => {
          setSearch("");
          setSuggestions([]);
          setSelected(value);
        }}
        label="Username"
        placeholder="Search by first name"
        selected={selected}
        value={search}
        suggestions={suggestions}
      />
    </>
  );
}

export default App;
