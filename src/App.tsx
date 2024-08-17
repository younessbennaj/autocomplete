import { useEffect, useState } from "react";
import "./App.css";
import DATA from "./data";

function fetchSuggestions(search: string): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const suggestions = DATA.filter((item) => {
        return item.toLowerCase().includes(search.toLowerCase());
      });
      resolve(suggestions);
    }, 1000);
  });
}

function Autocomplete({
  loading,
  onChange,
  value,
  suggestions,
}: {
  loading: boolean;
  onChange: (value: string) => void;
  value: string;
  suggestions: string[];
}) {
  return (
    <>
      <input
        className="autocomplete-input"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          // setSearch(event.target.value);
          onChange(event.target.value);
        }}
        type="text"
        value={value}
      />
      {!loading ? (
        <ul>
          {suggestions.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

function App() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (search.length === 0) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    fetchSuggestions(search).then((suggestions) => {
      setSuggestions(suggestions);
      setLoading(false);
    });
  }, [search]);
  return (
    <>
      <h1>Autocomplete</h1>
      <p>search for: {search}</p>
      <Autocomplete
        loading={loading}
        onChange={setSearch}
        value={search}
        suggestions={suggestions}
      />
    </>
  );
}

export default App;
