import { useState } from "react";

export const useClosure = () => {
  let [isOpen, setIsOpen] = useState<boolean>(true);

  const onOpen = () => {
    setIsOpen (!isOpen);
  };

  const onClose = () => {
    setIsOpen  (false);
  };
  return { onOpen, onClose, isOpen };
};
