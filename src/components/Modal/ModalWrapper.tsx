import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface ModalWrapperProps {
  id: string;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, id }) => {
  const navigate = useNavigate();

  return (
    <div
      id="overay"
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (target.matches("#overay")) {
          navigate(-1);
        }
      }}
      className="fixed flex justify-center items-center top-0 w-full h-full bg-black/50 z-30"
    >
      <motion.div
        id="modal"
        layoutId={id}
        className="h-60vh xl:h-80vh 2xl:h-90vh w-9/12 -mt-28 rounded-sm overflow-hidden mix-blend-screen z-20"
      >
        <div className="relative h-full">
          <div className="h-full w-full pb-8 overflow-y-auto shadow-sky-300 shadow-lg bg-stone-500 text-stone-200">
            <button
              id="exit"
              className="absolute top-0 left-0 px-2 py-1 text-slate-300 bg-stone-700  z-50 cursor-pointer hover:scale-110 rounded-sm active:scale-100 transition-all duration duration-75"
              onClick={() => navigate(-1)}
            >
              ✕
            </button>
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ModalWrapper;
