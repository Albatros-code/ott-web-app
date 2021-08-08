import React from "react";
import { useHistory } from "react-router-dom";

import { IMedia } from "../util/useGetMediaList";

// icons
import VideocamIcon from "@material-ui/icons/Videocam";

interface IMediaListItem {
  item: IMedia;
  width: number;
}

export default function MediaListItem(props: IMediaListItem) {
  const history = useHistory();
  const { item, width } = props;

  const mediaItemWrapper = React.useRef<any>(undefined);

  React.useEffect(() => {
    if (mediaItemWrapper) {
      mediaItemWrapper.current.setAttribute(
        "style",
        `width:${width}px;height:${(9 / 16) * width}px`
      );
    }
  }, [width]);

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

  const imageUrl = findImageUrl(item);

  return (
    <li onClick={handleClick}>
      <div className="media-list-item__wrapper" ref={mediaItemWrapper}>
        <div className="media-list-item__container">
          <div
            className="media-list-item__image"
            style={{ backgroundImage: `url('${imageUrl}')` }}
          >
            {!imageUrl && (
              <div className="media-list-item__missing-image">
                <VideocamIcon style={{ fontSize: "5rem" }} />
              </div>
            )}
          </div>
          <h1 className="media-list-item__title">{item.Title}</h1>
          <div className="media-list-item__container--hover"></div>
        </div>
      </div>
    </li>
  );
}
