import App from "app/App";
import store from "app/redux/store";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

const BackgroundAnimation = React.lazy(
  () => import("app/components/BackgroundAnimation")
);

ReactDOM.render(
  <React.Suspense fallback={""}>
    <BackgroundAnimation />
  </React.Suspense>,
  document.querySelector("#bg")
);
