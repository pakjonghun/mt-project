import React from "react";

interface SwitchButtonProps {
  disabled: boolean;
  title: string;
  onClick: () => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  onClick,
  disabled,
  title,
}) => {
  return (
    <button
      onClick={() => onClick()}
      disabled={!disabled}
      className={`switchButton select-none ${
        !disabled ? "pointer-events-none opacity-40" : "pointer-events-auto"
      }`}
    >
      {title}
    </button>
  );
};

export default SwitchButton;
