import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const TopNav: React.FC = () => {
  const navigate = useNavigate();
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => navigate("/"),
    },
    {
      label: "About",
      icon: "pi pi-user",
      command: () => navigate("/about"),
    },
    {
      label: "ChatBot",
      icon: "pi pi-pencil",
      command: () => navigate("/chat-bot"),
    },
    {
      label: "Privacy",
      icon: "",
      command: () => navigate("/privacy"),
    },
  ];

  function End() {
    function handleClick() {
      window.open("https://discord.gg/NhvfJAHzD3");
      return false;
    }
    return (
      <div>
        <Button icon={"pi pi-discord"} onClick={handleClick} />
      </div>
    );
  }

  return <Menubar className={"shadow-1"} model={items} end={<End />} />;
};

export default TopNav;
