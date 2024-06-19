"use client";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const newContainer = document.createElement("div");
    document.body.appendChild(newContainer);
    setContainer(newContainer);

    return () => {
      if (newContainer.parentNode) {
        newContainer.parentNode.removeChild(newContainer);
      }
    };
  }, []);

  if (!container) return null;

  return ReactDOM.createPortal(children, container);
};

export default Portal;
