import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Row, InputGroup } from 'react-bootstrap'
import './settingbox.scss'
import { MODAL_CLOSE, MODAL_CONFIRM } from '../../util/const'
import useApp from '../../util/getContext'

function SettingBox(props) {
  const { show, onAction } = props
  const [loadingAction, setLoadingAction] = useState(false)
  const [validatedForm, setValidatedForm] = useState(false)
  const { auth } = useApp()
  const { user } = auth
  useEffect(() => {
    if (loadingAction) {
      confirmSendingRequest().then(() => {
        setLoadingAction(false)
      })
    }
  }, [loadingAction])

  const handleSubmitForm = (e) => {
    const form = e.currentTarget
    if (form.checkValidate() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidatedForm(true)
  }

  const handleSubmitLoading = (value) => {
    return value
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
      <Modal.Header>
        <Modal.Title className="h5">Settings Box</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validatedForm}
          onSubmit={handleSubmitForm}
          className="form-modal"
        >
          <Row className="form-modal-row">
            <Form.Group
              md="4"
              controlId="validationCustom01"
              className="form-modal-row-group"
              style={{ marginRight: '50px' }}
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Name"
                defaultValue={user.name}
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
                  defaultValue={user.username}
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
  )
}

export default SettingBox
