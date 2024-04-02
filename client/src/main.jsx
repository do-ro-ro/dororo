import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import ScrollToTop from "./utils/scroll/ScrollToTop.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <BrowserRouter>
        <Provider store={store}>
            <ScrollToTop>
                <App />
            </ScrollToTop>
        </Provider>
    </BrowserRouter>,
    // </React.StrictMode>,
);
