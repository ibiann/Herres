import React from "react";
import "./remove.scss";
import { Button, Modal } from "react-bootstrap";
import HTMLReactParser from "html-react-parser";
import { MODAL_CLOSE, MODAL_CONFIRM } from "../../util/const";
import { CheckOutlined } from "@ant-design/icons";

function Remove(props) {
  const { title, content, show, onAction } = props;

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
        <Modal.Title className="h5">{HTMLReactParser(title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{HTMLReactParser(content)}</Modal.Body>
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

export default Remove;