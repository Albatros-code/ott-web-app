import React from "react";
import { useHistory } from "react-router-dom";
import useGetMediaList from "../util/useGetMediaList";

// components
import OttLogo from "../components/OttLogo";
import TopBar from "../components/TopBar";
import MediaListItem from "../components/MediaListItem";
import MediaList from "../components/MediaList";
import SplashScreen from "../components/SplashScreen";

// utils
import { useAppContext } from "../util/AppContext";

export default function Home() {
  const history = useHistory();
  // const { appState, setAppState } = useAppContext();

  const data = useGetMediaList(3);
  const data2 = useGetMediaList(10);

  return data && data2 ? (
    <div className="home__wrapper">
      <TopBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MediaList title={"Media List 1"} data={data} />
        <MediaList title={"Media List 2"} data={data2} />
      </div>
    </div>
  ) : (
    <SplashScreen />
  );
}
