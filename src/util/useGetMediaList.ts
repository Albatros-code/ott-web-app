import React from "react";

// utill
import { api } from "./util";

export interface IMedia {
  Id: number;
  Title: string;
  Guid: string;
  Images: {
    Id: number;
    Url: string;
    ImageTypeCode: string;
  }[];
  IsTrialContentAvailable: boolean;
}

export default function useGetMediaList(MediaListId: number) {
  const [fetchedData, setFetchedData] = React.useState<IMedia[] | undefined>(
    undefined
  );

  React.useEffect(() => {
    function getMediaList() {
      api
        .post("/Media/GetMediaList", {
          MediaListId: MediaListId,
          IncludeCategories: false,
          IncludeImages: true,
          IncludeMedia: false,
          PageNumber: 1,
          PageSize: 15,
        })
        .then((res) => {
          setFetchedData(res.data.Entities);
        });
    }

    getMediaList();
  }, [MediaListId]);

  return fetchedData;
}
