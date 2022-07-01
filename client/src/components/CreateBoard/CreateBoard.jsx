import React, { useState } from "react";
import AppBar from "../BoardPage/AppBar";
import { Card, Col, Row, Button, Modal, Form, Input } from "antd";
import { GithubPicker } from "react-color";
import "../../assets/scss/createboard.scss";
import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const CreateBoard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const defaultColor = { r: "241", g: "112", b: "19", a: "1" };
  const [color, setColor] = useState(defaultColor);
  const [colorPickerDisplay, setColorPickerDisplay] = useState(false);

  const handleColorToggleClick = () => {
    setColorPickerDisplay(!colorPickerDisplay);
  };

  const handleColorToggleClose = () => {
    setColorPickerDisplay(false);
  };

  const handleChangeColor = (color) => setColor(color.rgb);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setConfirmModal(true);
    setTimeout(() => {
      setModalVisible(false);
      setConfirmModal(false);
    }, 2000);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const validateMessage = {
    required: "${label} is required!",
  };

  const onFinishModal = (values) => {
    console.log(values);
  };

  return (
    <div className="create-board-navbar">
      <AppBar />
      <div className="list-board">
        <Row gutter={16}>
          <Col>
            <Card
              cover={
                <img alt="board" src="https://picsum.photos/id/1/300/200" />
              }
            >
              <a href="/board" target="_self" rel="noopener noreferrer">
                <p>Trungpc</p>
                <SettingOutlined />
              </a>
            </Card>
          </Col>
          <Col>
            <Card
              title=" "
              headStyle={{
                backgroundColor: "blue",
                borderRadius: "10px 10px 0 0",
              }}
            >
              <a href="/board" target="_self" rel="noopener noreferrer">
                <p>Custom board 01</p>
                <SettingOutlined />
              </a>
            </Card>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={showModal}
              className="add-board-icon"
            >
              <PlusOutlined />
            </Button>
            <Modal
              title="Create Board"
              visible={modalVisible}
              maskClosable={false}
              centered
              confirmLoading={confirmModal}
              onOk={handleConfirm}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  <CloseOutlined />
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading={confirmModal}
                  onClick={handleConfirm}
                  htmlType="submit"
                >
                  <CheckOutlined />
                </Button>,
              ]}
            >
              <Form
                {...layout}
                name="nest-message"
                onFinish={onFinishModal}
                validateMessage={validateMessage}
              >
                <Form.Item
                  name="Title"
                  label="Title"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item name="color" label="Color">
                  <div>
                    <div onClick={handleColorToggleClick}>Choose one</div>
                    {colorPickerDisplay ? (
                      <div onClick={handleColorToggleClose}>
                        <GithubPicker
                          color={color}
                          onChange={handleChangeColor}
                        />
                      </div>
                    ) : null}
                  </div>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CreateBoard;
