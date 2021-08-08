import React from "react";
import { Link } from "react-router-dom";

// components
import OttLogo from "../components/OttLogo";

export default function notFound() {
  return (
    <div className="not-found__wrapper">
      <div className="not-found__comment">
        <OttLogo size={5} color="secondary" />
        <h1>404</h1>
        <h2>Page not found.</h2>
        <p>
          Go to <Link to={"/"}>home page.</Link>
        </p>
      </div>
    </div>
  );
}
