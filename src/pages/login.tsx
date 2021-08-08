import React from "react";
import { useHistory } from "react-router-dom";

// util
import { useAppContext, loginAnonymousUser } from "../util/AppContext";

// components
import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";

import SplashScreen from "../components/SplashScreen";

export default function Login() {
  const history = useHistory();
  const { appState, setAppState } = useAppContext();

  const [loginFormVisibility, setLoginFormVisibility] = React.useState(true);
  const [formLoading, setFormLoading] = React.useState(false);
  const [loginErrors, setLoginErrors] = React.useState(false);

  React.useEffect(() => {
    if (appState.user.authenticated) {
      history.push("/");
    }
  }, [appState.user.authenticated, history]);

  const handleGuestLogin = () => {
    setLoginFormVisibility(false);
    setFormLoading(true);
    setTimeout(
      () =>
        loginAnonymousUser(setAppState).then((res) => {
          history.push("/");
        }),
      200
    );
  };

  const handleLogin = () => {
    setFormLoading(true);
    setTimeout(() => {
      setLoginErrors(true);
      setFormLoading(false);
    }, 1000);
  };

  return (
    <div>
      {/* <h1>login page</h1> */}
      <SplashScreen hiddenLoadingIndicator={true} />
      <div
        className={`login__wrapper ${
          !loginFormVisibility && "login__wrapper--hidden"
        }`}
      >
        <div className="login__container">
          {formLoading && (
            <div className="login__container--loading">
              <CircularProgress color="secondary" />
            </div>
          )}
          <h1>Login</h1>
          <form
            className="login__form"
            autoComplete="off"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          >
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              error={loginErrors}
              color="secondary"
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              error={loginErrors}
              color="secondary"
              type="password"
            />
          </form>
          <div className="login__buttons">
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Button
                  onClick={handleLogin}
                  variant="contained"
                  color="secondary"
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button disabled variant="contained" color="secondary">
                  Sign up
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={handleGuestLogin}
                  variant="outlined"
                  color="secondary"
                >
                  Login as guest user
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}
