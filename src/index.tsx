import App from "app/App";
import store from "app/store/store";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
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
