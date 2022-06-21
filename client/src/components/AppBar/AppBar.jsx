import React from "react";
import "./appbar.scss";
import {
  Container as BootstrapContainer,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import {
  MenuOutlined,
  HomeOutlined,
  SolutionOutlined,
  SearchOutlined,
  ScheduleOutlined,
  BellOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

function AppBar() {
  return (
    <nav className="app-navbar-top">
      <BootstrapContainer className="appbar-container">
        <Row>
          <Col xs={6} md={4} className="col-no-padding">
            <div className="action-apps">
              <div className="items-left all">
                <MenuOutlined />
              </div>
              <div className="items-left home">
                <HomeOutlined />
              </div>
              <div className="items-left boards">
                <SolutionOutlined />
                &nbsp;&nbsp;<span className="text-element">Boards</span>
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
              <a href="www.google.com" target="blank">
                <img
                  src="https://picsum.photos/200/200"
                  className="logo-top"
                  alt="merres-logo"
                />
                <span className="logo-app-name">Merres</span>
              </a>
            </div>
          </Col>
          <Col xs={6} md={4} className="col-no-padding">
            <div className="user-action">
              <div className="items-right quick">
                <ScheduleOutlined />
              </div>
              <div className="items-right news">
                <ThunderboltOutlined />
              </div>
              <div className="items-right notification">
                <BellOutlined />
              </div>
              <div className="items-right user-avatar">
                <img
                  src="https://picsum.photos/200/200"
                  alt="avatar-user"
                  title="merres"
                />
              </div>
            </div>
          </Col>
        </Row>
      </BootstrapContainer>
    </nav>
  );
}

export default AppBar;
