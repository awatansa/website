import React from "react";
import { createUseStyles } from "react-jss";
import { Ball } from "./Ball";

const useStyle = createUseStyles({
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
  "@keyframes animate": {
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

const BackgroundAnimation: React.FC<{}> = ({ children }) => {
  const classes = useStyle();
  const count = Math.round(Math.random() * 20 + 20);
  return (
    <div>
      <div className={classes.animationWrapper}>
        {[...Array(count)].map((_value, index) => (
          <Ball key={index} index={index} />
        ))}
      </div>
      {children}
    </div>
  );
};

export default BackgroundAnimation;
