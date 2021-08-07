import React from "react";
import { useHistory } from "react-router-dom";

import { IMedia } from "../util/useGetMediaList";

// icons
import VideocamIcon from "@material-ui/icons/Videocam";

interface IMediaListItem {
  item: IMedia;
}

export default function MediaListItem(props: IMediaListItem) {
  const history = useHistory();
  const { item } = props;

  function handleClick() {
    history.push(`/player/${item.Id}`);
  }

  const findImageUrl = (item: IMedia) => {
    const frameImage = item.Images.find(
      (image) => image.ImageTypeCode === "FRAME"
    );

    return frameImage?.Url;
  };

  function clampTitle(title: string, characters: number) {
    console.log(title.length);
    if (title.length > characters) {
      return title.substring(0, characters) + "...";
    } else {
      return title;
    }
  }

  const imageUrl = findImageUrl(item);

  console.log(item);

  return (
    <li onClick={handleClick}>
      <div className="media-list-item__container">
        <div
          className="media-list-item__image"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        >
          {!imageUrl && (
            <div className="media-list-item__missing-image">
              <VideocamIcon style={{ fontSize: "5rem" }} />
              {/* <p>Image not found</p> */}
            </div>
          )}
        </div>
        <h1 className="media-list-item__title">{clampTitle(item.Title, 35)}</h1>
      </div>
    </li>
  );
}
