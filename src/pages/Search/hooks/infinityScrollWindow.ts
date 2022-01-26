import React, { useEffect } from "react";
import { TMDBData, MTType } from "../../../apis/types";
import { InfiniteData } from "react-query";

type Data = {
  isLoading: boolean;
  data: InfiniteData<TMDBData<MTType[]>> | undefined;
  hasNextPage: boolean | undefined;
  fetchNextPage: Function;
  isFetching: boolean;
};

const useInfinityScroll = (data: Data) => {
  useEffect(() => {
    const getScroll = () => {
      const totalScorolled =
        document.documentElement.clientHeight + window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      if (
        totalScorolled + document.documentElement.clientHeight / 2 >=
        scrollHeight
      ) {
        if (data.hasNextPage && !data.isFetching) {
          data.fetchNextPage();
        }
      }
    };

    let timer: null | NodeJS.Timeout;
    const throttling = () => {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          getScroll();
        }, 1);
      }
    };

    window.addEventListener("scroll", throttling);
    return () => {
      window.removeEventListener("scroll", throttling);
    };
  }, [data]);
};

export default useInfinityScroll;
