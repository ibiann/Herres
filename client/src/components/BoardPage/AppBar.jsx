import React from "react";
import "../../assets/scss/appbar.scss";
import {
  Container as BootstrapContainer,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Dropdown, Menu } from "antd";
<<<<<<< HEAD:client/src/components/BoardPage/AppBar.jsx
import logo from "../../assets/svg/logo.svg";
=======
>>>>>>> 33e004eabbfd95329520c92ab613b63510d6cd14:client/src/components/AppBar/AppBar.jsx

import {
  HomeOutlined,
  SolutionOutlined,
  SearchOutlined,
} from "@ant-design/icons";

function AppBar() {
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
<<<<<<< HEAD:client/src/components/BoardPage/AppBar.jsx
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
=======
>>>>>>> 33e004eabbfd95329520c92ab613b63510d6cd14:client/src/components/AppBar/AppBar.jsx
            <a target="_blank" rel="noopener noreferrer" href="#">
              Settings
            </a>
          ),
        },
        {
          key: "2",
          label: (
<<<<<<< HEAD:client/src/components/BoardPage/AppBar.jsx
            <a target="_self" rel="noopener noreferrer" href={"/login"}>
=======
            <a target="_blank" rel="noopener noreferrer" href={"/login"}>
>>>>>>> 33e004eabbfd95329520c92ab613b63510d6cd14:client/src/components/AppBar/AppBar.jsx
              Log out
            </a>
          ),
        },
      ]}
    />
  );
<<<<<<< HEAD:client/src/components/BoardPage/AppBar.jsx

=======
>>>>>>> 33e004eabbfd95329520c92ab613b63510d6cd14:client/src/components/AppBar/AppBar.jsx
  return (
    <nav className="app-navbar-top">
      <BootstrapContainer className="appbar-container">
        <Row>
          <Col xs={6} md={4} className="col-no-padding">
            <div className="action-apps">
              <div className="items-left home">
                <a href={"/"} target="_self" rel="noopener noreferrer">
                  <HomeOutlined />
                </a>
              </div>
              <div className="items-left boards">
                <SolutionOutlined />
                &nbsp;&nbsp;<span className="text-element"> Recent Boards</span>
              </div>
              <div className="items-left searching-bar">
                <InputGroup className="group-searching">
                  <FormControl
                    className="input-search"
                    placeholder="Jump to..."
                  />
                  <SearchOutlined className="input-icon-searching-bar" />
                </InputGroup>
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
              <Dropdown overlay={menu}>
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
