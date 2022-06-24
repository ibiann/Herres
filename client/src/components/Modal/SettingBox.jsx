import React from "react";
import { Button, Modal } from "react-bootstrap";
import { MODAL_CLOSE, MODAL_CONFIRM } from "../../util/const";
import { CheckOutlined } from "@ant-design/icons";

function SettingBox(props) {
  const { show, onAction } = props;

  const handleSubmitLoading = (value)  => {
    return value
  }

  return (
    <Modal
      show={show}
      onHide={() => onAction(MODAL_CLOSE)}
      backdrop="static"
      keyboard={false}
      animation={false}
    >
      <CheckOutlined className="custom-icon-modal" />
      <Modal.Header>
        <Modal.Title className="h5">Settings Box</Modal.Title>
      </Modal.Header>
      <Modal.Body>Settings</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onAction(MODAL_CLOSE)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onAction(MODAL_CONFIRM)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SettingBox;
