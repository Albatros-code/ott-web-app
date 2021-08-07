import React from "react";
import { useHistory } from "react-router-dom";
import useGetMediaList from "../util/useGetMediaList";

// components
import OttLogo from "../components/OttLogo";
import MediaListItem from "../components/MediaListItem";
import SplashScreen from "../components/SplashScreen";

// utils
import { useAppContext } from "../util/AppContext";

export default function Home() {
  const history = useHistory();
  // const { appState, setAppState } = useAppContext();

  const data = useGetMediaList(3);
  const data2 = useGetMediaList(10);

  return data && data2 ? (
    <div>
      <OttLogo size={4} />
      <div
        style={{
          display: "flex",
        }}
      >
        <ul>
          {data &&
            data.map((item) => {
              return <MediaListItem item={item} key={item.Id} />;
            })}
        </ul>
        <ul>
          {data2 &&
            data2.map((item) => {
              return <MediaListItem item={item} key={item.Id} />;
            })}
        </ul>
      </div>
    </div>
  ) : (
    <SplashScreen />
  );
}
