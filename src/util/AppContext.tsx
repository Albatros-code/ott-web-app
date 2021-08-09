import React from "react";

// components
import SplashScreen from "../components/SplashScreen";

// utils
import { api } from "./util";

const timeouts: NodeJS.Timeout[] = [];

const clearTimeouts = () => {
  for (let i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }
};

interface IAppContextState {
  user: {
    authenticated: boolean;
    id: number | null;
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
    id: null,
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
  const [appState, setAppState] = React.useState<IAppContextState>(
    appContextStateInitialValues
  );
  const {
    UI: { loading: loadingUI },
  } = appState;

  React.useEffect(() => {
    refreshToken(setAppState);
    return clearTimeouts;
  }, []);

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

export function refreshTokenApi(refreshToken: string) {
  const annonymousUser = refreshToken && refreshToken === "anonymous";

  const requestUrl = annonymousUser
    ? "/Authorization/SignIn"
    : "/Authorization/RefreshToken";
  const requestBody = annonymousUser
    ? {}
    : {
        Token: refreshToken,
        Device: {
          Name: "string",
          PlatformCode: "string",
          FirebaseToken: "string",
          DpiCode: "string",
        },
      };

  return new Promise<any>((resolve, reject) => {
    api
      .post(requestUrl, requestBody)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function refreshToken(setAppState: IAppContext["setAppState"]) {
  console.log("refreshToken");
  delete api.defaults.headers.common["Authorization"];
  const userRefreshToken = sessionStorage.getItem("refreshToken");

  if (userRefreshToken) {
    refreshTokenApi(userRefreshToken)
      .then((res) => {
        handleAuthorizationResponse(res, setAppState);
      })
      .catch((err) => {
        sessionStorage.removeItem("refreshToken");
      });
  } else {
    setTimeout(() => {
      setAppState((prev) => ({
        ...prev,
        UI: { ...prev.UI, loading: false },
      }));
    }, 1000);
  }
}

export function loginUser(
  setAppState: IAppContext["setAppState"],
  username?: string,
  password?: string
) {
  return new Promise<any>((resolve, reject) => {
    api
      .post("/Authorization/SignIn", {
        Password: password,
        Username: username,
      })
      .then((res) => {
        handleAuthorizationResponse(res, setAppState);

        resolve(res);
      })
      .catch((err) => {
        reject("rejected");
      });
  });
}

function handleAuthorizationResponse(
  res: any,
  setAppState: IAppContext["setAppState"]
) {
  const token = `Bearer ${res.data.AuthorizationToken.Token}`;
  api.defaults.headers.common["Authorization"] = token;

  setAppState((prev) => ({
    ...prev,
    UI: { ...prev.UI, loading: false },
    user: { ...prev.user, authenticated: true, id: res.data.User.Id },
  }));

  const newRefreshToken = res.data.AuthorizationToken.RefreshToken;

  sessionStorage.setItem(
    "refreshToken",
    `${newRefreshToken ? newRefreshToken : "anonymous"}`
  );

  const tokenExpirationTime = new Date(
    res.data.AuthorizationToken.TokenExpires
  );
  const currentTime = new Date();
  const tokenValidityTime =
    tokenExpirationTime.getTime() - currentTime.getTime();

  timeouts.push(
    setTimeout(() => {
      refreshToken(setAppState);
    }, tokenValidityTime - 3000)
  );
}

export function logoutUser(appContext: IAppContext) {
  const { setAppState } = appContext;

  delete api.defaults.headers.common["Authorization"];
  sessionStorage.removeItem("refreshToken");
  clearTimeouts();

  setAppState((prev) => ({
    ...prev,
    user: { ...appContextStateInitialValues.user },
  }));
}
