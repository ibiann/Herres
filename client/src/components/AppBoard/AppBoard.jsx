import React from "react";
import { Container as BootstrapContainer, Row, Col } from 'react-bootstrap';
import { BookOutlined, CoffeeOutlined, ContactsOutlined, PlusCircleOutlined } from "@ant-design/icons";

import "./appboard.scss";


function AppBoard() {
  return (
  <nav className="app-navbar-board">
    <BootstrapContainer className="app-board-container">
      <Row>
        <Col sm={10} xs={12} className="col-no-padding">
          <div className="board-navbar-info">
            <div className="items board-logo-icon"><CoffeeOutlined />&nbsp;&nbsp;<strong>Merres</strong></div>
            <div className="divider"></div>

            <div className="items board-type">Workspace</div>
            <div className="divider"></div>
            <div className="items members-avatar">
              <img src="https://picsum.photos/200/200" alt="" />
              <img src="https://picsum.photos/200/200" alt="" />
              <img src="https://picsum.photos/200/200" alt="" />
              <img src="https://picsum.photos/200/200" alt="" />
              <img src="https://picsum.photos/200/200" alt="" />
              <span className="members-plus"><PlusCircleOutlined /></span>
              <span className="inviting"><ContactsOutlined /><strong>Invite</strong></span>
            </div>
          </div>
        </Col>
        <Col sm={2} xs={12} className="col-no-padding">
          <div className="board-actions">
            <div className="items menu"><BookOutlined /></div>
          </div>
        </Col>
      </Row>
    </BootstrapContainer>
  </nav>
  )
}

export default AppBoard;
