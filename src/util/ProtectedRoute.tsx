import { Redirect, Route, useLocation } from "react-router-dom";

// util
import { useAppContext } from "./AppContext";

interface IProtectedRouteProps {
  component: any;
  [key: string]: any;
}

const ProtectedRoute = ({
  component: Component,
  ...rest
}: IProtectedRouteProps) => {
  const {
    appState: {
      user: { authenticated },
    },
  } = useAppContext();
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location.pathname },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
