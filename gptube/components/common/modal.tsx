import {
  Modal as ModalNextUI,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  type ModalProps,
} from "@nextui-org/react";

import { rubikFont } from "./fonts";

interface ModalPropsWithChildren extends ModalProps {
  children: React.ReactNode;
  Footer?: React.ReactNode;
}

export const Modal = ({
  onOpenChange,
  isOpen,
  children,
  title,
  Footer,
  ...rest
}: ModalPropsWithChildren) => {
  return (
    <ModalNextUI className={`${rubikFont.className} ${rest.className ?? ''}`} isOpen={isOpen} onOpenChange={onOpenChange} {...rest}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            {Footer ? <ModalFooter>{Footer}</ModalFooter> : null}
          </>
        )}
      </ModalContent>
    </ModalNextUI>
  );
};
