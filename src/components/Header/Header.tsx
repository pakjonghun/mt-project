import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import Input from "./components/Input";
import List from "../List";
import Logo from "./components/Logo";
import Menu from "./components/Menu";
import { Paths } from "../../router/types";
import { useTransform, useViewportScroll, motion } from "framer-motion";
import { useGetMiddlePath } from "../Carocel/hooks/hooks";

const Header = () => {
  const { scrollY } = useViewportScroll();
  const headerController = useTransform(
    scrollY,
    [60, 110],
    ["rgba(0,0,0,1)", "rgba(0,0,0,0)"]
  );

  const style = useMemo(
    () => ({
      itemStyle: "h-full",
      listStyle: "flex items-center h-full",
    }),
    []
  );
  const path = useGetMiddlePath();

  return (
    //header height-size must pt-size
    <div
      style={{ paddingBottom: "10%" }}
      className="min-h-screen pt-20 md:pt-24 md:text-lg lg:text-xl 2xl:text-2xl bg-black"
    >
      <motion.header
        style={{
          backgroundColor:
            path?.[1].trim() === "search" ? "1" : headerController,
        }}
        className="fixed top-0 flex item-center justify-between w-full h-20 md:h-24 bg-black z-10"
      >
        <List
          styles={style}
          contents={[
            <Logo />,
            <Menu title={"Movie"} path={Paths.movies} />,
            <Menu title={"TV"} path={Paths.tvs} />,
          ]}
        />
        <Input />
      </motion.header>
      <Outlet />
    </div>
  );
};

export default Header;
