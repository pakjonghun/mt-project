import { QueryClient } from "react-query";
import { createStandaloneToast, UseToastOptions } from "@chakra-ui/react";

const toast = createStandaloneToast();

const queryErrorHandler = (error: unknown) => {
  const options: UseToastOptions = {
    ...(error instanceof Error
      ? { title: error.name, description: error.message }
      : { title: "Error", description: "Query Error" }),
    status: "error",
  };

  toast.closeAll();
  toast(options);
};

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      cacheTime: 90000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onError: (error) => queryErrorHandler(error),
    },
  },
});

export default client;
