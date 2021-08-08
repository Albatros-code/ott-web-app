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
  // const contentAvailable = item.IsTrialContentAvailable
  const contentAvailable = true;

  function handleClick() {
    if (contentAvailable) history.push(`/player/${item.Id}`);
  }

  const findImageUrl = (item: IMedia) => {
    let frameImage = item.Images.find(
      (image) => image.ImageTypeCode === "FRAME"
    );

    if (!frameImage) {
      frameImage = item.Images[0];
    }

    return frameImage?.Url;
  };

  function clampTitle(title: string, characters: number) {
    if (title.length > characters) {
      return title.substring(0, characters) + "...";
    } else {
      return title;
    }
  }

  const imageUrl = findImageUrl(item);

  return (
    <li onClick={handleClick}>
      <div
        className={`media-list-item__container ${
          contentAvailable && "media-list-item__container--hover"
        }`}
      >
        <div
          className="media-list-item__image"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        >
          {!imageUrl && (
            <div className="media-list-item__missing-image">
              <VideocamIcon style={{ fontSize: "5rem" }} />
              {/* {!contentAvailable && <p>Content not available right now.</p>} */}
              {contentAvailable && (
                <p>Content might not be available right now.</p>
              )}
            </div>
          )}
        </div>
        <h1 className="media-list-item__title">{clampTitle(item.Title, 35)}</h1>
      </div>
    </li>
  );
}
