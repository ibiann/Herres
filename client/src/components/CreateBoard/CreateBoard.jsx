import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, List, Col, Row, Button, Modal, Form, Input } from "antd";
import React, { useState } from "react";
import "../../assets/scss/createboard.scss";
import AppBar from "../BoardPage/AppBar";

const CreateBoard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

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
    <div className="createboard-navbar">
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
                  name="title"
                  label="title"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
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
