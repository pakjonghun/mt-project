import React, { useEffect, useRef, useState } from "react";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal/Modal";
import Item from "./components/Item";
import { useSearch } from "./hooks/hooks";
import { useGetMovieSearchResult } from "./hooks/reactQueryHooks";

export type SearchTarget = "movie" | "tv" | "multi";

const Search = () => {
  const [searchTareget, setSearchTarget] = useState<SearchTarget>("multi");
  const term = useSearch();
  const data = useGetMovieSearchResult(term || "", 1, searchTareget);

  const ref = useRef<HTMLDivElement>(null);
  const onSelected = (value: SearchTarget) => setSearchTarget(value);

  useEffect(() => {
    const getScroll = () => {
      const totalScorolled =
        document.documentElement.clientHeight + window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;

      if (totalScorolled + 400 >= scrollHeight) {
        if (data.hasNextPage) data.fetchNextPage();
      }
    };

    let timer: null | NodeJS.Timeout;
    const throttling = () => {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          getScroll();
        }, 10);
      }
    };

    window.addEventListener("scroll", throttling);
    return () => window.removeEventListener("scroll", throttling);
  }, [data]);
  if (data.isLoading) {
    return (
      <div className="flex justify-center items-center  w-full h-screen bg-black">
        <Loading />
      </div>
    );
  }

  return (
    <main className="px-3 text-stone-300">
      <div ref={ref} className="mx-auto w-fit overflow-y-auto">
        <div className="flex items-center mb-5">
          <h1 className="h4 font-bold">{`${term} : Search Result`}</h1>
          <select
            className="ml-3 h-fit"
            defaultValue={searchTareget}
            onChange={(event) => onSelected(event.target.value as SearchTarget)}
          >
            <option value="tv">TV</option>
            <option value="movie">Movie</option>
            <option value="multi">All</option>
          </select>
        </div>
        <div>
          <div
            className={`grid items-start grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 w-full`}
          >
            {data.data?.pages?.map((item) =>
              item.results.map((jtem) => {
                switch (searchTareget) {
                  case "movie":
                    if (jtem.media_type !== "movie") break;
                    return <Item key={jtem.id} data={jtem} />;

                  case "tv":
                    if (jtem.media_type !== "tv") break;
                    return <Item key={jtem.id} data={jtem} />;

                  case "multi":
                    if (jtem.media_type !== "movie" && jtem.media_type !== "tv")
                      break;
                    return <Item key={jtem.id} data={jtem} />;
                  default:
                    break;
                }
              })
            )}
          </div>
        </div>
      </div>
      <Modal />
    </main>
  );
};

export default Search;
