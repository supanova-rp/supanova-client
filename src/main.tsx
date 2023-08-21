import ReactDOM from "react-dom/client";

import "react-circular-progressbar/dist/styles.css";
import "video.js/dist/video-js.css";
import "./styles/index.scss";

import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);