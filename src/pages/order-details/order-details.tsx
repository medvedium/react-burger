import React, { useEffect } from "react";
import { useActions } from "../../hooks/actions";
import { _WS_URL } from "../../utils/constants";
import FeedDetails from "../../components/feed-details/feed-details";
import { getCookie } from "../../utils/cookie";

const OrderDetailsPage = () => {
  const { open, close } = useActions();
  const accessToken = getCookie("token");
  useEffect(() => {
    open({ url: `${_WS_URL}?token=${accessToken}` });

    return () => {
      close();
    };
  });
  return <FeedDetails />;
};

export default OrderDetailsPage;
