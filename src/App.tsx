import { useEffect, useState } from "react";
import "./App.css";
import DATA from "./data.json";
import Autocomplete from "./components/Autocomplete";

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
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search.length === 0) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    fetchSuggestionsByProductName(search).then((suggestions) => {
      setSuggestions(suggestions);
      setLoading(false);
    });
  }, [search]);

  return (
    <>
      <h1>Autocomplete</h1>
      <p>search for: {search}</p>
      <Autocomplete
        getSuggestionLabel={(suggestion: User) => suggestion.firstName}
        loading={loading}
        onChange={setSearch}
        onSuggestionClick={(value) => {
          alert(`You selected ${value}`);
        }}
        value={search}
        suggestions={suggestions}
      />
    </>
  );
}

export default App;
