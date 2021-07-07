import useStyles from "app/utils/styles";
import { Button } from "primereact/button";
import React from "react";

const TopNav: React.FC = () => {
  const classes = useStyles();

  function handleClick() {
    window.location.href = "https://discord.gg/NhvfJAHzD3";
  }

  return (
    <div>
      <div className={classes.topNav}>
        <div className="button-demo">
          <div className="card">
            <div className="template">
              <Button
                className="discord p-p-0"
                icon={"pi pi-discord p-p-2"}
                onClick={handleClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
