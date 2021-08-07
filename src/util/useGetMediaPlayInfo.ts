import React from "react";
import { api } from "./util";

export interface IMediaPlayInfo {
  MediaId: number;
  Title: string;
  ContentUrl: string;
  Description: string;
}

export default function useGetMediaPlayInfo(mediaId: number) {
  const [fetchedData, setFetchedData] = React.useState<
    IMediaPlayInfo | null | undefined
  >(undefined);

  React.useEffect(() => {
    function getData() {
      api
        .post("/Media/GetMediaPlayInfo", {
          MediaId: mediaId,
          StreamType: "TRIAL",
        })
        .then((res) => {
          if (res.data === "") {
            setFetchedData(null);
          } else {
            setFetchedData(res.data);
          }
        })
        .catch((err) => {});
    }

    getData();
  }, [mediaId]);

  return fetchedData;
}
