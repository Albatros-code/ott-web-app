import React from "react";

// components
import MediaListItem from "./MediaListItem";

// types
import { IMedia } from "../util/useGetMediaList";

interface IMediaListProps {
  title: string;
  data: IMedia[];
}

export default function MediaList(props: IMediaListProps) {
  const { title, data } = props;

  return (
    <div className="media-list__wrapper">
      <h1 className="media-list__title">{title}</h1>
      <div className="media-list__container">
        <ul className="media-list__space">
          {data &&
            data.map((item) => {
              return <MediaListItem item={item} key={item.Id} />;
            })}
        </ul>
      </div>
    </div>
  );
}
