import useStyles from "app/utils/styles";
import React from "react";
import { Button } from "primereact/button";

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
              <Button className="discord p-p-0" onClick={handleClick}>
                <i className="pi pi-discord p-px-2"></i>
                &nbsp;
                <span className="p-px-3">Discord</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
