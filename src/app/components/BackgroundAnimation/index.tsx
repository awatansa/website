import React, { ReactNode } from "react";
import { Ball } from "./Ball";
import useStyles from "./styles";

const BackgroundAnimation: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const classes = useStyles();
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
