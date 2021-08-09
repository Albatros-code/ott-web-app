import React from "react";
import { useHistory } from "react-router-dom";

// util
import { useAppContext, loginUser } from "../util/AppContext";

// components
import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";

import SplashScreen from "../components/SplashScreen";

export default function Login() {
  const history = useHistory();
  const { appState, setAppState } = useAppContext();

  const [loginFormVisibility, setLoginFormVisibility] = React.useState(true);
  const [formLoading, setFormLoading] = React.useState(false);
  const [loginErrors, setLoginErrors] = React.useState(false);

  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });

  const inputRef = React.useRef<HTMLInputElement>();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleChange = (e: any) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

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
        loginUser(setAppState).then((res) => {
          history.push("/");
        }),
      200
    );
  };

  const handleLogin = () => {
    if (!form.username || !form.password) {
      setLoginErrors(true);
      return;
    }

    setFormLoading(true);
    loginUser(setAppState, form.username, form.password)
      .then((res) => {
        setFormLoading(false);
        history.push("/");
      })
      .catch((err) => {
        setFormLoading(false);
        setLoginErrors(true);
      });
  };

  return (
    <div>
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
              id="username"
              label="Username"
              variant="outlined"
              error={loginErrors}
              color="secondary"
              value={form.username}
              onChange={handleChange}
              inputRef={inputRef}
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              error={loginErrors}
              color="secondary"
              type="password"
              value={form.password}
              onChange={handleChange}
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
                  continue as guest
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}
