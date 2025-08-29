import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./state/store.js";
import { Auth0Provider } from "@auth0/auth0-react";
const domain = import.meta.env.VITE_DOMAIN;
const clientid = import.meta.env.VITE_CLIENTID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain="dev-0b3jh700mwszqd4e.us.auth0.com"
        clientId="YY2qMgeB4BlEY4gsLvOkHfPe3N1oLTyO"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "https://localhost:5000",
          scope: "openid profile email",
        }}
      >
        <App />
      </Auth0Provider>
    </Provider>
  </StrictMode>
);
