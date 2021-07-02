import { createUseStyles } from "react-jss";

const jssStyles = createUseStyles({
  topNav: {
    display: "flex",
    height: 96,
    width: "100vw",
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  
});

function useStyles() {
  return jssStyles();
}

export default useStyles;
