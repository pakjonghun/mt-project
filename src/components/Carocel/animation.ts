type AniProps = {
  direction: number;
};

export const animation = {
  initial: (direction: number) => ({
    x: direction > 0 ? -window.innerWidth + 56 : window.innerWidth - 56,
  }),

  animate: { x: 0, transition: { type: "tween", duration: 0.5 } },
  exit: (direction: number) => ({
    x: direction > 0 ? window.innerWidth - 56 : -window.innerWidth + 56,
    transition: { type: "tween", duration: 0.5 },
  }),
};
