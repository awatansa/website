import { createUseStyles } from "react-jss";

const jssStyles = createUseStyles({
  ball: () => {
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
    return {
      position: "absolute",
      display: "block",
      background: "linear-gradient(to left, #61c635, #35d827)",
      width: size,
      height: size,
      left: left,
      top: top,
      animation: "$animate-ball linear infinite",
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      borderRadius: 50,
      boxShadow: "inset 0 0 0 200px #00ff5515",
      filter: `blur(${blur}px)`,
      overflow: "hidden",
      zIndex: -10000,
    };
  },
  "@keyframes animate-ball": {
    from: {
      transform: "translate(0, 0) rotate(0deg)",
      opacity: 1,
    },
    to: {
      transform: "translate(800px, 800px) rotate(720deg)",
      opacity: 0,
    },
  },
  animationWrapper: {
    background: `rbg(${240}, ${240}, ${240})`,
    width: "100%",
    height: `100vh`,
    zIndex: -10000,
    position: "absolute",
    overflow: "hidden",
    left: 0,
    top: 0,
  },
  "@keyframes animate-div": {
    from: {
      transform: ["translate(0, 0)", "rotate(0deg)"],
      opacity: 1,
    },
    to: {
      transform: ["translate(800px, 800px)", "rotate(720deg)"],
      opacity: 0,
    },
  },
});

export default function useStyles() {
  return jssStyles();
}
