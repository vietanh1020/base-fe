import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalProps,
  ModalTitle,
} from "react-bootstrap";
import { IconMultiply } from "../icons/IconMultiply";
import PaymentStripe from "./PaymentStripe";
interface ModalCardAddProps extends ModalProps {
  handleClose: () => void;
}

export const ModalCardAdd = ({ handleClose, ...props }: ModalCardAddProps) => {
  return (
    <>
      <Modal onHide={handleClose} {...props}>
        <ModalHeader>
          <div onClick={handleClose}>
            <IconMultiply />
          </div>
          <ModalTitle>addNewACard</ModalTitle>
        </ModalHeader>

        <ModalBody>
          <PaymentStripe footer={false} handleClose={handleClose} />
        </ModalBody>
      </Modal>
    </>
  );
};
