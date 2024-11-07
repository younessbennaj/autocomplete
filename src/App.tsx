import "./App.css";
import PlaceAutocomplete from "./components/PlaceAutocomplete";

function App() {
  return (
    <>
      <h1>Autocomplete</h1>
      <div
        style={{
          width: "300px",
        }}
      >
        <PlaceAutocomplete />
      </div>
    </>
  );
}

export default App;
