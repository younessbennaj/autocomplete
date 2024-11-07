import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import PlaceAutocomplete from "./components/PlaceAutocomplete";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>Autocomplete</h1>
        <div
          style={{
            width: "300px",
          }}
        >
          <PlaceAutocomplete />
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
