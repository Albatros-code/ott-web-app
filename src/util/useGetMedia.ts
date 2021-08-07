import React from "react";
import { api } from "./util";

export interface IMediaInfo {
  Id: number;
  Title: string;
  Year: number;
  Duration: number;
  MediaAgeRestrictionValueMin: number;
  MediaAgeRestrictionImageUrl: string;
}

export default function useGetMedia(MediaId: number) {
  const [fetchedData, setFetchedData] = React.useState<
    IMediaInfo | null | undefined
  >(undefined);

  React.useEffect(() => {
    function getData() {
      api
        .post("/Media/GetMedia", {
          MediaId: MediaId,
          IncludeCategories: false,
          IncludePeople: false,
          IncludeImages: false,
          IncludeSimilarMedia: false,
          IncludePurchaseOffers: false,
        })
        .then((res) => {
          if (res.data === "") {
            setFetchedData(null);
          } else {
            setFetchedData(res.data);
          }
        });
    }

    getData();
  }, [MediaId]);

  return fetchedData;
}
