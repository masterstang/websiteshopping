import React from "react";
import ReactDOM from "react-dom";

/* REDUX */
import { Provider } from "react-redux";
import store from "./store";

/* COMPONENTS */
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/* STYLING */
import "./index.css";
import "./bootstrap.min.css";

/* translation */
import './i18n';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);


reportWebVitals();
