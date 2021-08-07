import React from "react";
import Logo from "./OttLogo";
import CircularProgress from "@material-ui/core/CircularProgress";

interface ISplashScreen {
  hidden: boolean;
}

const defaultProps = {
  hidden: false,
};

SplashScreen.defaultProps = defaultProps;

export default function SplashScreen(props: ISplashScreen) {
  const { hidden } = props;

  return (
    <div className="splash-screen__container">
      <Logo size={10} color="secondary" />
      <p className="splash-screen__comment">
        Simple application for watching videos.
      </p>
      <CircularProgress
        className={`splash-screen__progress ${
          hidden && "splash-screen__progress--hidden"
        }`}
      />
    </div>
  );
}
