import React from "react";
import ReactDOM from "react-dom";
import Pages from "./pages/pages";
import store, { rrfProps } from "./store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Pages />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
