import React from "react";
import '../../../assets/scss/BoardComponentStyles/bottombtngroup.scss'
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Row } from "antd";

const BottomButtonGroup = (props) => {
  const { clickCallback, closeCallback, title } = props;
  return (
    <Row className="row-container">
      <PlusCircleOutlined className="add-btn-group" onClick={() => clickCallback()}>
        {title}
      </PlusCircleOutlined>
      <>
        <CloseOutlined className="close-btn-group" onClick={() => closeCallback()} fontSize="medium" />
      </>
    </Row>
  );
};

export default BottomButtonGroup;
