import React from "react";
import { Provider } from "react-redux";
import "./global.css";
import AppNavigation from "./navigation/appNavigation";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

