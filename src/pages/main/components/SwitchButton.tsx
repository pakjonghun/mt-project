import React from "react";

interface SwitchButtonProps {
  isMovie: boolean;
  title: string;
  onClick: () => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  onClick,
  isMovie,
  title,
}) => {
  return (
    <button
      onClick={() => onClick()}
      disabled={!isMovie}
      className={`switchButton ${
        !isMovie ? "pointer-events-none opacity-50" : "pointer-events-auto"
      }`}
    >
      {title}
    </button>
  );
};

export default SwitchButton;
