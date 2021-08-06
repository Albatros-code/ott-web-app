import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/index.scss";

// utils
import ProtectedRoute from "./util/ProtectedRoute";
import AppContextProvider from "./util/AppContext";

// pages
import Home from "./pages/home";
import Login from "./pages/login";
import Player from "./pages/player";
import NotFound from "./pages/notFound";

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/player/:videoId" component={Player} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
