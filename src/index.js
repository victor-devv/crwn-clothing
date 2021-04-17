import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/es/integration/react'

import "./index.css";
import App from "./App";

import { store, persistor } from "./redux/store";

// import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  // pass the redux store to the provider. The provider will then give (provide) the redux store context to the rest of the application, so we can dispatch actions to the store or pull values from the store into components
  <Provider store={store}>
    <BrowserRouter>
      {/* persistgate provides the persisted store to the application */}
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
