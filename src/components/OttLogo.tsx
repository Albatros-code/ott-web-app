import React from "react";

// components
import LiveTvIcon from "@material-ui/icons/LiveTv";

interface IOttLogo {
  size: number;
  color:
    | "black"
    | "primary"
    | "primary-light"
    | "secondary"
    | "secondary-light";
}

const defaultProps = {
  size: 1,
  color: "black",
};

OttLogo.defaultProps = defaultProps;

function OttLogo(props: IOttLogo) {
  const { size, color } = props;

  return (
    <div className="ottlogo__container">
      <LiveTvIcon
        className={`ottlogo__icon font-color--${color}`}
        style={{ fontSize: `${size}rem` }}
      />
      <p
        className={`ottlogo__text font-color--${color}`}
        style={{ fontSize: `${size * 0.9}rem` }}
      >
        OTT
      </p>
    </div>
  );
}

export default OttLogo;
