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
  const [appState, setAppState] = React.useState(appContextStateInitialValues);
  const {
    UI: { loading: loadingUI },
  } = appState;

  React.useEffect(() => {
    function refreshToken() {
      delete api.defaults.headers.common["Authorization"];

      //   return new Promise((resolve, reject) => {
      api
        .post("/Authorization/SignIn", {})
        //api.post("/Authorization/SignIn", "", { withCredentials: true })
        .then((res) => {
          console.log(res.data);

          const token = `Bearer ${res.data.AuthorizationToken.Token}`;
          api.defaults.headers.common["Authorization"] = token;

          setAppState((prev) => ({
            ...prev,
            UI: { ...prev.UI, loading: false },
            user: { ...prev.user, authenticated: true },
          }));

          // setTimeout(() => {
          //   refreshToken();
          // }, (exp - iat) * 1000 - 500);

          // resolve("resolved");
        })
        .catch((err) => {
          //   });
        });
    }

    // Promise.allSettled([refreshToken()]).then((results) => {});
    refreshToken();
  }, []);

  return loadingUI ? (
    <SplashScreen />
  ) : (
    <AppContext.Provider
      value={{ appState: appState, setAppState: setAppState }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
