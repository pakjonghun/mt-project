import { Provider } from "react-redux";
import Routers from "../router/Router";
import store from "../store";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import client from "../reactQuery";
import { ReactQueryDevtools } from "react-query/devtools";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <QueryClientProvider client={client}>
          <ChakraProvider>
            <Routers />
          </ChakraProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
