import React from "react";

// components
import SplashScreen from "../components/SplashScreen";

// utils
import { api } from "./util";

interface IAppContextState {
  user: {
    authenticated: boolean;
  };
  UI: {
    loading: boolean;
  };
}

interface IAppContext {
  appState: IAppContextState;
  setAppState: React.Dispatch<React.SetStateAction<IAppContextState>>;
}

const appContextStateInitialValues = {
  user: {
    authenticated: false,
  },
  UI: {
    loading: true,
  },
};

const AppContext = React.createContext<IAppContext>({
  appState: appContextStateInitialValues,
  setAppState: () => {},
});

export const useAppContext = () => React.useContext(AppContext);

const AppContextProvider = (props: any) => {
  console.log("app Context Provider Refresh");
  const [appState, setAppState] = React.useState(appContextStateInitialValues);
  const {
    UI: { loading: loadingUI },
  } = appState;

  const annonymousUserSessionStorage = sessionStorage.getItem("anonymousUser");
  const annonymousUser =
    annonymousUserSessionStorage && parseInt(annonymousUserSessionStorage);

  React.useEffect(() => {
    console.log("app Context Provider Effect");

    function refreshToken() {
      delete api.defaults.headers.common["Authorization"];

      if (annonymousUser) {
        console.log("logging in Effect");

        loginAnonymousUser(setAppState)
          .then((res) => {
            // api
            //   .post("/Authorization/SignIn", {})
            //   //api.post("/Authorization/SignIn", "", { withCredentials: true })
            //   .then((res) => {
            //     const token = `Bearer ${res.data.AuthorizationToken.Token}`;
            //     api.defaults.headers.common["Authorization"] = token;
            //     setAppState((prev) => ({
            //       ...prev,
            //       UI: { ...prev.UI, loading: false },
            //       user: { ...prev.user, authenticated: true },
            //     }));

            const tokenExpirationTime = new Date(
              res.data.AuthorizationToken.TokenExpires
            );
            const currentTime = new Date();
            const tokenValidityTime =
              tokenExpirationTime.getTime() - currentTime.getTime();

            setTimeout(() => {
              refreshToken();
            }, tokenValidityTime - 3000);
          })
          .catch((err) => {});
      } else {
        setTimeout(() => {
          setAppState((prev) => ({
            ...prev,
            UI: { ...prev.UI, loading: false },
          }));
        }, 1000);
      }
    }

    refreshToken();
  }, [annonymousUser]);

  return loadingUI ? (
    <SplashScreen hiddenLoadingIndicator={true} />
  ) : (
    <AppContext.Provider
      value={{ appState: appState, setAppState: setAppState }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export function loginAnonymousUser(setAppState: IAppContext["setAppState"]) {
  // const { setAppState } = appContext;

  return new Promise<any>((resolve, reject) => {
    api
      .post("/Authorization/SignIn", {})
      .then((res) => {
        const token = `Bearer ${res.data.AuthorizationToken.Token}`;
        api.defaults.headers.common["Authorization"] = token;
        setAppState((prev) => ({
          ...prev,
          UI: { ...prev.UI, loading: false },
          user: { ...prev.user, authenticated: true },
        }));

        sessionStorage.setItem("anonymousUser", "1");

        resolve(res);
      })
      .catch((err) => {
        reject("rejected");
      });
  });
}

export function logoutUser(appContext: IAppContext) {
  console.log("logging out");

  const { setAppState } = appContext;

  delete api.defaults.headers.common["Authorization"];
  sessionStorage.setItem("anonymousUser", "0");

  setAppState((prev) => ({
    ...prev,
    // UI: { ...prev.UI, loading: false },
    user: { ...prev.user, authenticated: false },
  }));
}
