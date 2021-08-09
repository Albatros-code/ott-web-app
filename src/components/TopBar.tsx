import React from "react";
import { Link } from "react-router-dom";

// util
import { useAppContext, logoutUser } from "../util/AppContext";

// components
import { Button } from "@material-ui/core";
import InputIcon from "@material-ui/icons/Input";

import OttLogo from "./OttLogo";

export default function TopBar() {
  const appContext = useAppContext();

  const handleLogout = () => {
    logoutUser(appContext);
  };

  return (
    <div className="top-bar__container">
      <Link to="/">
        <OttLogo size={3.5} color="secondary" />
      </Link>
      <div className="top-bar__buttons">
        {appContext.appState.user.id && appContext.appState.user.id > 0 && (
          <p>User Id: {appContext.appState.user.id}</p>
        )}
        <Button
          onClick={handleLogout}
          variant="contained"
          color="secondary"
          startIcon={<InputIcon />}
        >
          {appContext.appState.user.id && appContext.appState.user.id > 0
            ? "Log out"
            : "Log in"}
        </Button>
      </div>
    </div>
  );
}
