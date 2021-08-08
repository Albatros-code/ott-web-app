import React from "react";

// components
import CircularProgress from "@material-ui/core/CircularProgress";

import Logo from "./OttLogo";

interface ISplashScreen {
  hiddenLoadingIndicator: boolean;
}

const defaultProps = {
  hiddenLoadingIndicator: false,
};

SplashScreen.defaultProps = defaultProps;

export default function SplashScreen(props: ISplashScreen) {
  const { hiddenLoadingIndicator } = props;

  return (
    <div className="splash-screen__container">
      <div className="splash-screen__logo">
        <Logo size={10} color="secondary" />
        <p className="splash-screen__comment">
          Simple application for watching videos.
        </p>
      </div>
      <CircularProgress
        className={`splash-screen__progress ${
          hiddenLoadingIndicator && "splash-screen__progress--hidden"
        }`}
      />
    </div>
  );
}
