import React from "react";
import "../../assets/scss/appbar.scss";
import { Container as BootstrapContainer, Row, Col } from "react-bootstrap";
import { Dropdown, Menu, Input, Tooltip } from "antd";
import logo from "../../assets/img/logo.png";
import {
  HomeFilled,
  ProjectOutlined,
  CloseOutlined,
  LoginOutlined,
  RetweetOutlined,
  IdcardOutlined
} from "@ant-design/icons";

function AppBar() {
  const { Search } = Input;
  const onSearch = (value) => console.log(value);

  const menuAva = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a target="_blank" rel="noopener noreferrer" href="#">
              Settings
            </a>
          ),
          icon: <IdcardOutlined />
        },
        {
          type: "divider",
        },
        {
          key: "2",
          icon: <LoginOutlined />,
          label: (
            <a target="_blank" rel="noopener noreferrer" href={"/login"}>
              Log out
            </a>
          ),
        },
      ]}
    />
  );

  const recBoardMenu = (
    <Menu
      items={[
        {
          key: "1",
          label: <span className="">Recent Boards</span>,
          icon: <RetweetOutlined />,
        },
        {
          type: "divider",
        },
        {
          key: "2",
          label: (
            <a href="#" target="_blank" rel="noopener noreferrer">
              Custom Board 1
            </a>
          ),
        },
        {
          key: "3",
          label: (
            <a href="#" target="_blank" rel="noopener noreferrer">
              Custom Board 2
            </a>
          ),
        },
      ]}
    />
  );

  return (
    <nav className="app-navbar-top">
      <BootstrapContainer className="appbar-container">
        <Row>
          <Col xs={6} md={4} className="col-no-padding">
            <div className="action-apps">
              <div className="items-left home">
                <a href={"/"} target="_self">
                  <HomeFilled />
                </a>
              </div>
              <div className="items-left recent-boards">
                <Dropdown overlay={recBoardMenu} trigger={["click"]}>
                  <a onClick={(e) => e.preventDefault()}>
                    <ProjectOutlined />
                    &nbsp;&nbsp;
                    <span className="text-element">Recent Board</span>
                  </a>
                </Dropdown>
              </div>
              <div className="items-left searching-bar">
                <Tooltip
                  title={<span>Type here</span>}
                  placement="bottom"
                  trigger="focus"
                  className="tooltip-searching-bar"
                >
                  <Search
                    placeholder="Input search text"
                    allowClear={{ clearIcon: <CloseOutlined /> }}
                    onSearch={onSearch}
                    className="searching-bar-box"
                  />
                </Tooltip>
              </div>
            </div>
          </Col>
          <Col xs={6} md={4} className="col-no-padding">
            <div className="app-branding text">
              <a href="www.google.com" target="_self">
                <img src={logo} className="logo-top" alt="merres-logo" />
                <span className="logo-app-name">Merres</span>
              </a>
            </div>
          </Col>
          <Col xs={6} md={4} className="col-no-padding">
            <div className="user-action">
              <Dropdown overlay={menuAva} arrow>
                <div
                  className="items-right user"
                  onClick={(e) => e.preventDefault()}
                >
                  <img
                    src="https://picsum.photos/id/1/200/300"
                    alt="avatar-user"
                  />
                </div>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </BootstrapContainer>
    </nav>
  );
}

export default AppBar;
