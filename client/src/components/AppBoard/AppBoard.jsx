import React, { useState } from "react";
import { Dropdown, Divider, Input, Select, Typography, Space } from "antd";
import { Container as BootstrapContainer, Row, Col } from "react-bootstrap";
import {
  BookOutlined,
  CloseOutlined,
  CoffeeOutlined,
  ContactsOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import "./appboard.scss";

function AppBoard() {
  const { Paragraph } = Typography;
  const { Option } = Select;

  const [lengthLimitText, setLengthLimitText] = useState("Custom Board");
  const [itemDropDownList, SetItemDropDownList] = useState([]);
  const [nameItemList, setNameItemList] = useState("");
  const [optionsSelected, setOptionsSelected] = useState([]);

  const onNameItemListChange = (e) => {
    setNameItemList(e.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    SetItemDropDownList([
      ...itemDropDownList,
      nameItemList || `No title ${index++}`,
    ]);
    setNameItemList("");
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setOptionsSelected(value);
  };

  return (
    <nav className="app-navbar-board">
      <BootstrapContainer className="app-board-container">
        <Row>
          <Col sm={10} xs={12} className="col-no-padding">
            <div className="board-navbar-info">
              <div className="items board-logo-icon">
                <CoffeeOutlined />
                &nbsp;&nbsp;<strong>Merres</strong>
              </div>
              <div className="divider"></div>

              <Paragraph
                style={{
                  margin: 8,
                  marginLeft: 12,
                  padding: 2,
                  fontWeight: "bold",
                }}
                editable={{
                  onChange: setLengthLimitText,
                  maxlength: 6,
                  tooltip: false,
                  enterIcon: null,
                  autoSize: { maxRows: 1, minRows: 1 },
                }}
                className="items board-type"
              >
                {lengthLimitText}
              </Paragraph>
              <div className="divider"></div>
              <div className="items members-avatar">
                <img src="https://picsum.photos/200/200" alt="" />
                <img src="https://picsum.photos/200/200" alt="" />
                <img src="https://picsum.photos/200/200" alt="" />
                <img src="https://picsum.photos/200/200" alt="" />
                <img src="https://picsum.photos/200/200" alt="" />
                <span className="inviting">
                  <ContactsOutlined />
                  <strong>Invite</strong>
                </span>
                <Select
                  style={{
                    width: 240,
                    marginLeft: 10,
                  }}
                  showArrow={false}
                  bordered={true}
                  placeholder="Inviting email to board...."
                  allowClear={{
                    clearIcon: <CloseOutlined />,
                  }}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: "8px 0" }} />
                      <Space align="center" style={{ padding: "0 8px 4px" }}>
                        <Input
                          allowClear={{
                            clearIcon: (
                              <CloseOutlined style={{ color: "red" }} />
                            ),
                          }}
                          placeholder="Please enter the email"
                          value={nameItemList}
                          onChange={onNameItemListChange}
                        />
                        <Typography.Link
                          onClick={addItem}
                          style={{ whitespace: "nowrap", padding: 2 }}
                        >
                          <PlusOutlined style={{ color: "#4E89FF" }} />
                        </Typography.Link>
                      </Space>
                    </>
                  )}
                >
                  {itemDropDownList.map((item) => (
                    <Option key={item}>{item}</Option>
                  ))}
                </Select>
              </div>
            </div>
          </Col>
          <Col sm={2} xs={12} className="col-no-padding">
            <div className="board-actions">
              <div className="items menu">
                <BookOutlined />
              </div>
            </div>
          </Col>
        </Row>
      </BootstrapContainer>
    </nav>
  );
}

export default AppBoard;
