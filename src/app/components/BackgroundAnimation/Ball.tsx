import React from "react";
import { createUseStyles } from "react-jss";

const Ball: React.FC<{ index: number }> = ({ index }) => {
  const temp_size = Math.round(Math.abs(Math.random() * 100));
  const size = temp_size < 10 ? temp_size + 20 : temp_size;
  const blur = (size * 30) / 100;
  const duration = size / 2;
  const delay = 0;
  // TODO: calculate screen width when screen size changes
  const screenWidth = window.screen.width;
  const left =
    Math.random() < 0.5
      ? Math.random() * screenWidth
      : Math.random() * screenWidth * -1;
  const top = size * -1 * Math.random() * 10;

  const useStyle = createUseStyles({
    ball: {
      position: "absolute",
      display: "block",
      background: "linear-gradient(to left, #357fd3, #8d2cb9)",
      width: size,
      height: size,
      left: left,
      top: top,
      animation: "$animate linear infinite",
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      borderRadius: 50,
      boxShadow: "inset 0 0 0 200px #00ff5515",
      filter: `blur(${blur}px)`,
      overflow: "hidden",
      zIndex: -10000,
    },
    "@keyframes animate": {
      from: {
        transform: "translate(0, 0) rotate(0deg)",
        opacity: 1,
      },
      to: {
        transform: "translate(800px, 800px) rotate(720deg)",
        opacity: 0,
      },
    },
  });

  const css = useStyle();
  return (
    <>
      <span key={index} className={css.ball} />
    </>
  );
};

export { Ball };
