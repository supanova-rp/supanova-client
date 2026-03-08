import * as Sentry from "@sentry/react";
import ReactDOM from "react-dom/client";

import "react-circular-progressbar/dist/styles.css";
import "video.js/dist/video-js.css";
import "./styles/index.scss";

import App from "./App";

if (import.meta.env.VITE_ENVIRONMENT === "production") {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    sendDefaultPii: true,
    environment: "production",
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
