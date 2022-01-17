import React from "react";
import { motion } from "framer-motion";

interface BorderProps {
  initial?: object;
  animate?: object;
  exit?: {};
  className: string;
  layoutId?: string;
}

const Border: React.FC<BorderProps> = (props) => {
  return <motion.div {...props} />;
};

export default Border;
