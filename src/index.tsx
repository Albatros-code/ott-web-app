import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/index.scss";

// utils
import ProtectedRoute from "./util/ProtectedRoute";
import AppContextProvider from "./util/AppContext";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

// pages
import Home from "./pages/home";
import Login from "./pages/login";
import Player from "./pages/player";
import NotFound from "./pages/notFound";
import SplashScreen from "./components/SplashScreen";

const theme = createTheme({
  palette: {
    primary: {
      main: "#b3e9c7",
    },
    secondary: {
      main: "#392768",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    button: {
      fontWeight: 300,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <Router>
          <Switch>
            <Route exact path="/elo" component={SplashScreen} />
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/player/:mediaId" component={Player} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </AppContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
