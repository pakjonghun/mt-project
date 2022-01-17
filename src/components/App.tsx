import { Provider } from "react-redux";
import Routers from "../router/Router";
import store from "../store";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import client from "../reactQuery";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <ChakraProvider>
          <Routers />
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
