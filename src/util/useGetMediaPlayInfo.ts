import React from "react";
import { api } from "./util";

export interface IMediaPlayInfo {
  MediaId: number;
  Title: string;
  ContentUrl: string;
}

export default function useGetMediaPlayInfo(mediaId: number) {
  const [fetchedData, setFetchedData] = React.useState<
    IMediaPlayInfo | undefined
  >(undefined);

  React.useEffect(() => {
    function getMediaList() {
      api
        .post("/Media/GetMediaPlayInfo", {
          MediaId: mediaId,
          StreamType: "TRIAL",
        })
        .then((res) => {
          setFetchedData(res.data);
        });
    }

    getMediaList();
  }, [mediaId]);

  return fetchedData;
}
