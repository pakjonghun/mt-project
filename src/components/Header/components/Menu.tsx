import React from "react";
import { Link, useMatch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Paths } from "../../../router/types";
import Border from "../../Border";
import { useGetMiddlePath } from "../../Carocel/hooks/hooks";

interface MenuProps {
  path: keyof typeof Paths;
  title: string;
}

const Menu: React.FC<MenuProps> = ({ path, title }) => {
  const isMatch = useGetMiddlePath() === path;
  return (
    <Link
      to={path}
      className="flex flex-col items-center justify-center h-full px-5 text-red-700 font-bold select-none"
    >
      {title}
      <AnimatePresence>
        {isMatch && (
          <Border
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layoutId="menu"
            className="absolute bottom-1 w-2 h-1 bg-red-700 rounded-full"
          />
        )}
      </AnimatePresence>
    </Link>
  );
};

export default Menu;
