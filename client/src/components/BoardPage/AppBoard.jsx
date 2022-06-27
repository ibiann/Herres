import React, { useState } from "react";
import "../../assets/scss/appboard.scss";
import { Divider, Input, Select, Typography, Space, Avatar } from "antd";
import { Container as BootstrapContainer, Row, Col } from "react-bootstrap";
import {
  BookOutlined,
  CloseOutlined,
  CoffeeOutlined,
  ContactsOutlined,
  PlusOutlined,
} from "@ant-design/icons";

function AppBoard() {
  const { Paragraph } = Typography;
  const { Option } = Select;

  const [lengthLimitText, setLengthLimitText] = useState("Custom Board");
  const [itemDropDownList, SetItemDropDownList] = useState([]);
  const [nameItemList, setNameItemList] = useState("");

  const [uploadingFile, setUploadingFile] = useState(null);

  const handleChangeUpload = function loadFile(e) {
    if (e.target.files.length > 0) {
      const uploadingFile = URL.createObjectURL(e.target.files[0]);
      setUploadingFile(uploadingFile);
    }
  };

  const onNameItemListChange = (e) => {
    setNameItemList(e.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    SetItemDropDownList([
      ...itemDropDownList,
      // eslint-disable-next-line no-undef
      nameItemList || `No title ${index++}`,
    ]);
    setNameItemList("");
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
              <div className="divider" />

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
              <div className="divider" />
              <div className="items avatar">
                <Avatar.Group>
                  <Avatar
                    size={{
                      sm: 32,
                    }}
                    src="https://picsum.photos/id/10/200/300/?blur"
                    alt="img"
                  />
                  <Avatar
                    size={{
                      sm: 32,
                    }}
                    src="https://picsum.photos/id/1/200/300/?blur"
                    alt="img"
                  />
                  <Avatar
                    size={{
                      sm: 32,
                    }}
                    src="https://picsum.photos/id/1005/200/300/?blur"
                    alt="img"
                  />
                  <Avatar
                    size={{
                      sm: 32,
                    }}
                    src="https://picsum.photos/id/1004/200/300/?blur"
                    alt="img"
                  />
                </Avatar.Group>
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
                              <CloseOutlined style={{ color: "#e74c3c" }} />
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
