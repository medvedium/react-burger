import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./components/app/app";
import ErrorBoundary from "./components/error-boundary/error-boundary";
import "./index.css";
import "./normalize.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <ErrorBoundary>
      <BrowserRouter basename={"/react-burger"}>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
