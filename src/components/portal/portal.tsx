import PortalReactDOM from "react-dom";
import { ReactElement, useEffect, useState } from "react";

interface PortalProps {
  children: ReactElement;
}

const Portal = ({ children }: PortalProps) => {
  const [modalContainer] = useState(() => document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(modalContainer);
    return () => {
      document.body.removeChild(modalContainer);
    };
  }, [modalContainer]);

  return PortalReactDOM.createPortal(children, modalContainer);
};

export default Portal;
