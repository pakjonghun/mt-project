import { Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Spinner
      thickness="5px"
      speed="0.65s"
      emptyColor="gray.200"
      color="red.500"
      size="xl"
    />
  );
};

export default Loading;
