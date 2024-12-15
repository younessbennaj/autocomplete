import { useState } from "react";
import "./App.css";

import { Autocomplete } from "./components/Autocomplete";

import styles from "./App.module.css";
import { AutocompleteInput } from "./components/AutocompleteInput";
import { AutocompleteOptions } from "./components/AutocompleteOptions";
import { AutocompleteOption } from "./components/AutocompleteOption";

type Destination = {
  name: string;
  id: number;
};

const destinations = [
  { id: 1, name: "Paris" },
  { id: 2, name: "Tokyo" },
  { id: 3, name: "Milan" },
  { id: 4, name: "Bangkok" },
  { id: 5, name: "Los Angeles" },
  { id: 6, name: "New York" },
  { id: 7, name: "London" },
  { id: 8, name: "Sydney" },
  { id: 9, name: "Rome" },
  { id: 10, name: "Barcelona" },
  { id: 11, name: "Dubai" },
  { id: 12, name: "San Francisco" },
  { id: 13, name: "Berlin" },
  { id: 14, name: "Istanbul" },
  { id: 15, name: "Amsterdam" },
  { id: 16, name: "Prague" },
  { id: 17, name: "Seoul" },
  { id: 18, name: "Cape Town" },
  { id: 19, name: "Vienna" },
  { id: 20, name: "Singapore" },
];

function App() {
  const [query, setQuery] = useState("");
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  const filteredDestination =
    query === ""
      ? destinations
      : destinations.filter((destination) => {
          return destination.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className={styles.App}>
      <h1>My Own Headless Autocomplete Component</h1>
      <h3>
        Selected destination:{" "}
        <span
          style={{
            color: "#3b82f6",
          }}
        >
          {selectedDestination?.name}
        </span>
      </h3>

      <div
        style={{
          width: "300px",
        }}
      >
        <Autocomplete
          className={styles.wrapper}
          onChange={(destination) => {
            const newDestination = destination as Destination;
            setSelectedDestination(newDestination);
          }}
          value={selectedDestination}
        >
          <label className={styles.label} htmlFor="destination">
            Destination
          </label>
          <AutocompleteInput
            aria-label={"Destination"}
            className={styles.inputWrapper}
            displayValue={(destination) =>
              (destination as Destination)?.name || ""
            }
            id="destination"
            onChange={(event) => setQuery(event.target.value)}
          />
          <AutocompleteOptions className={styles.dropdown}>
            {filteredDestination.map((destination) => {
              return (
                <AutocompleteOption
                  className={styles.autocompleteItem}
                  key={destination.id}
                  optionValue={destination}
                >
                  <span>{destination.name}</span>
                </AutocompleteOption>
              );
            })}
          </AutocompleteOptions>
        </Autocomplete>
      </div>
    </div>
  );
}

export default App;
