import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "tachyons";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Reducer } from "./reducers";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";

const logger = createLogger();
const store =
  process.env.NODE_ENV !== "development"
    ? createStore(Reducer, applyMiddleware(thunkMiddleware))
    : createStore(Reducer, applyMiddleware(thunkMiddleware, logger));

if (process.env.NODE_ENV !== "development") console.log = () => {};

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
