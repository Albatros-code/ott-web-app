import React from "react";
import { useHistory } from "react-router-dom";

import { IMedia } from "../util/useGetMediaList";

interface IMediaListItem {
  item: IMedia;
}

export default function MediaListItem(props: IMediaListItem) {
  const history = useHistory();
  const { item } = props;

  function handleClick() {
    history.push(`/player/${item.Id}`);
  }

  return <li onClick={handleClick}>{item.Title}</li>;
}
