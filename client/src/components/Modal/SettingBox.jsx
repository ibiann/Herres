import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Modal,
  Row,
  InputGroup
} from "react-bootstrap";
import './settingbox.scss'
import { MODAL_CLOSE, MODAL_CONFIRM } from "../../util/const";

function SettingBox(props) {
  const { show, onAction } = props;
  const [loadingAction, setLoadingAction] = useState(false);
  const [validatedForm, setValidatedForm] = useState(false);

  useEffect(() => {
    if (loadingAction) {
      confirmSendingRequest().then(() => {
        setLoadingAction(false);
      });
    }
  }, [loadingAction]);

  const handleSubmitForm = (e) => {
    const form = e.currentTarget;
    if (form.checkValidate() === false) {
      e.preventDefault()
      e.stopPropagation();
    }
    setValidatedForm(true)
  }

  return (
    <Modal
      show={show}
      onHide={() => onAction(MODAL_CLOSE)}
      backdrop="static"
      keyboard={false}
      animation={false}
      size="lg"
      centered
    >
      <Modal.Header >
        <Modal.Title className="h5">Settings Box</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validatedForm} onSubmit={handleSubmitForm} className="form-modal">
        <Row className="form-modal-row">
        <Form.Group md="4" controlId="validationCustom01" className="form-modal-row-group">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            defaultValue="Trung"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group md="4" controlId="validationCustom02" className="form-modal-row-group-2">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            defaultValue="Pham"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              defaultValue="trungpc"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Form.Group className="form-modal-check">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onAction(MODAL_CLOSE)}>
          Close
        </Button>
        <Button
          variant="primary"
          disabled={loadingAction}
          onClick={() => onAction(MODAL_CONFIRM)}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SettingBox;
