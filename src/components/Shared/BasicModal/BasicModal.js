import React from "react";
import { Modal, Icon } from "semantic-ui-react";
import "./BasicModal.scss";

export function BasicModal(props) {
  const { show, onClose, title, size, children } = props;

  return (
    <Modal open={show} size={size} onClose={onClose} className="basic-modal">
      <Modal.Header>
        <div />
        <span>{title}</span>
        <Icon name="close" onClick={onClose} link />
      </Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}

BasicModal.defaultProps = {
  size: "tiny",
};
