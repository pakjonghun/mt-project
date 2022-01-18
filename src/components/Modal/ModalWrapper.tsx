import React from "react";
import { motion, useViewportScroll } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface ModalWrapperProps {
  id?: string;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, id }) => {
  const { scrollY } = useViewportScroll();
  const navigate = useNavigate();

  if (!id) return null;
  return (
    <>
      <div
        onClick={(event) => {
          const target = event.target as HTMLElement;
          if (target.matches("#modal") || target.matches("#exit")) return;
          navigate(-1);
        }}
        className="fixed top-0 w-full h-full bg-slate-500/40 z-20"
      />
      <motion.div
        id="modal"
        layoutId={id}
        style={{ top: scrollY.get() + 50 }}
        className="absolute left-0 right-0 m-auto h-80vh w-9/12  bg-white rounded-md z-30"
      >
        <div className="relative h-full w-full overflow-y-auto shadow-sky-300 shadow-lg">
          <button
            id="exit"
            className="absolute px-2 py-1 text-slate-500 z-50 cursor-pointer hover:scale-125 active:scale-100"
            onClick={() => navigate(-1)}
          >
            ✖︎
          </button>
          {children}
        </div>
      </motion.div>
    </>
  );
};

export default ModalWrapper;
