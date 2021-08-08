import React from "react";

// util
import useGetMediaList from "../util/useGetMediaList";

// components
import TopBar from "../components/TopBar";
import MediaList from "../components/MediaList";
import SplashScreen from "../components/SplashScreen";

export default function Home() {
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
