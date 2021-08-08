import React from "react";

// components
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import MediaListItem from "./MediaListItem";

// types
import { IMedia } from "../util/useGetMediaList";

interface IMediaListProps {
  title: string;
  data: IMedia[];
}

export default function MediaList(props: IMediaListProps) {
  const { title, data } = props;
  const [windowWidth] = useWindowSize();

  // need to coresponds to css props
  const buttonWidth = 40;
  const mediaBorderWidth = 10;
  const mediaListWidth = 0.95 * windowWidth;

  const numberOfItem = data.length;
  const numberOfMedia = Math.ceil(windowWidth / 500);
  const initialPosition = buttonWidth + mediaBorderWidth;

  const [mediaListPosition, setMediaListPosition] = React.useState(0);

  const mediaWidth =
    (mediaListWidth -
      2 * buttonWidth -
      2 * mediaBorderWidth -
      (numberOfMedia - 1)) /
      numberOfMedia +
    1;

  const translatDistance = numberOfMedia * mediaWidth;
  const mediaListLeftPosition =
    initialPosition + (mediaListPosition * translatDistance) / numberOfMedia;

  const handleTranslate = (direction: 1 | -1) => {
    setMediaListPosition((prev) => {
      if (disableTranslation(direction, prev)) {
        return prev;
      } else {
        return prev + direction * numberOfMedia;
      }
    });
  };

  const disableTranslation = (direction: 1 | -1, mediaListPostion: number) => {
    if (
      direction === 1 &&
      (-mediaListPostion / numberOfMedia) * translatDistance <
        mediaListWidth * 0.8
    ) {
      return true;
    }
    if (
      direction === -1 &&
      (-mediaListPostion / numberOfMedia) * translatDistance >
        (numberOfItem / numberOfMedia - 1) * mediaListWidth * 0.8
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="media-list__wrapper">
      <h1 className="media-list__title">{title}</h1>
      <div className="media-list__container">
        <div
          className="media-list__space-container"
          style={{ height: `${(mediaWidth * 9) / 16}px` }}
        >
          <ul
            className="media-list__space"
            style={{
              left: `${mediaListLeftPosition}px`,
            }}
          >
            {data &&
              data.map((item) => {
                return (
                  <MediaListItem item={item} key={item.Id} width={mediaWidth} />
                );
              })}
          </ul>
        </div>
        <div
          className={`media-list__button media-list__button-left ${
            !disableTranslation(1, mediaListPosition) &&
            "media-list__button--hover"
          }`}
          onClick={() => handleTranslate(1)}
        >
          <NavigateBeforeIcon />
        </div>
        <div
          className={`media-list__button media-list__button-right ${
            !disableTranslation(-1, mediaListPosition) &&
            "media-list__button--hover"
          }`}
          onClick={() => handleTranslate(-1)}
        >
          <NavigateNextIcon />
        </div>
      </div>
    </div>
  );
}

function useWindowSize() {
  const [size, setSize] = React.useState([0, 0]);
  React.useLayoutEffect(() => {
    function updateSize() {
      const vw = Math.min(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const vh = Math.min(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      setSize([vw, vh]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
