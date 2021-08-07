import React from "react";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";

// util
import useGetMediaPlayInfo from "../util/useGetMediaPlayInfo";
import useGetMedia from "../util/useGetMedia";

// components
import TopBar from "../components/TopBar";
import SplashScreen from "../components/SplashScreen";

interface IPlayer {
  match: {
    params: {
      mediaId: string;
    };
  };
}

export default function Player(props: IPlayer) {
  const history = useHistory();
  const mediaId = parseInt(props.match.params.mediaId);

  const media = useGetMediaPlayInfo(mediaId);
  const mediaInfo = useGetMedia(mediaId);

  React.useEffect(() => {
    if (media === null || mediaInfo === null) {
      history.push("/404");
    }
  }, [history, media, mediaInfo]);

  console.log(media);
  console.log(mediaInfo);

  return media && mediaInfo ? (
    <div className="player__wrapper">
      <TopBar />
      <div className="player__title">
        <h1>{media && media.Title}</h1>
        {mediaInfo.Year && (
          <p className="player__description--inline">{mediaInfo.Year}</p>
        )}
      </div>
      <div className="player__player-wrapper">
        <ReactPlayer
          url={media?.ContentUrl}
          width="100%"
          height="100%"
          controls
          playing
          light
          className="player__player"
        />
      </div>
      <div className="player__description">
        <h2>Description</h2>
        <p>{media?.Description}</p>
        <div className="player__description-details">
          {mediaInfo.Duration && (
            <h3 className="player__description--inline">
              {formatDuration(mediaInfo.Duration)} min
            </h3>
          )}
        </div>
      </div>
    </div>
  ) : (
    <SplashScreen />
  );
}

function formatDuration(seconds: number) {
  // const hours = Math.floor(seconds / 1000 / 60 / 60);
  const minutes = Math.floor(seconds / 1000 / 60);
  return minutes;
}
