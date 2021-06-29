import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-green/theme.css";
import React from "react";

function ThemeLoader() {
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => response.json())
    .then((json) => console.log(json));
  return <React.Fragment></React.Fragment>;
}

export default ThemeLoader;
