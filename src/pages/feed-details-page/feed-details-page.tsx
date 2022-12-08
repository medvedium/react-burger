import React, { useEffect } from "react";
import FeedDetails from "../../components/feed-details/feed-details";
import { useActions } from "../../hooks/actions";
import { _WS_URL } from "../../utils/constants";

const FeedDetailsPage = () => {
  const { open, close } = useActions();
  useEffect(() => {
    open({ url: `${_WS_URL}/all` });

    return () => {
      close();
    };
  });
  return <FeedDetails />;
};

export default FeedDetailsPage;
