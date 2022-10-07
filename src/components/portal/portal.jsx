import PortalReactDOM from "react-dom";
import { useEffect, useState } from "react";

const Portal = (props) => {
  const { children } = props;
  const [container] = useState(() => document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return PortalReactDOM.createPortal(children, container);
};

export default Portal;
