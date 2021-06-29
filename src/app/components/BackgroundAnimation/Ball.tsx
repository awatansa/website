import React from "react";
import useStyles from "./styles";

const Ball: React.FC<{ index: number }> = ({ index }) => {
  const css = useStyles();
  return (
    <>
      <span key={index} className={css.ball} />
    </>
  );
};

export { Ball };
