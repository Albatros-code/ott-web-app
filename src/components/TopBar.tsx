import React from "react";
import { Link } from "react-router-dom";
import OttLogo from "./OttLogo";

export default function TopBar() {
  return (
    <div className="top-bar__container">
      <Link to="/">
        <OttLogo size={3.5} color="secondary" />
      </Link>
    </div>
  );
}
