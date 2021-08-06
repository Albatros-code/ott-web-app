import React from "react";
import ReactPlayer from "react-player";
import useGetMediaPlayInfo from "../util/useGetMediaPlayInfo";

interface IPlayer {
  match: {
    params: {
      mediaId: string;
    };
  };
}

export default function Player(props: IPlayer) {
  const mediaId = parseInt(props.match.params.mediaId);

  const media = useGetMediaPlayInfo(mediaId);

  return (
    <div>
      <h1>player page</h1>
      <h2>{media && media.Title}</h2>
      <ReactPlayer
        url={media?.ContentUrl}
        controls
        playing
        light
        style={{
          background: "black",
        }}
      />
    </div>
  );
}
