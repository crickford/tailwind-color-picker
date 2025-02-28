import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./components/layout";
import ColorPaletteGenerator from "./artifacts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      <ColorPaletteGenerator />
    </Layout>
  </React.StrictMode>
);
