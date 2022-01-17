import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { KeyRouters } from "../../../router/types";

const Logo = () => {
  return (
    <Link
      className="flex items-center justify-center h-full px-5 hover:scale-110 active:scale-100 transition-all duration-200 ease-linear"
      to={KeyRouters.home}
    >
      <motion.svg
        whileHover={{ opacity: [1, 0.1, 1] }}
        className="w-5 md:w-6 lg:w-7 2xl:w-8 text-red-700"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
      >
        <motion.path
          fill="currentColor"
          d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"
        />
      </motion.svg>
    </Link>
  );
};

export default Logo;
