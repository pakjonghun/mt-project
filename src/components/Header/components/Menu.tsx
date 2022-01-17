import React from "react";
import { Link, useMatch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Border from "../../Border";
import { KeyRouters } from "../../../router/types";

interface MenuProps {
  path: keyof typeof KeyRouters;
  title: string;
}

const Menu: React.FC<MenuProps> = ({ path, title }) => {
  const isMatch = useMatch(path);
  return (
    <Link
      to={path}
      className="flex flex-col items-center justify-center h-full px-5 text-red-700 font-bold"
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
