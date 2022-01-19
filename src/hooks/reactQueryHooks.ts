import { useAppDispatch } from "./reduxHooks";
import { QueryCache, useQueryClient } from "react-query";

type QueryProps = {
  key: string;
  page: number;
  api: (page: number) => Promise<any>;
};

export const usePreFetch = ({ key, page, api }: QueryProps) => {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery([key, page], () => api(page));
};
