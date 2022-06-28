import React from "react";
import '../../../assets/scss/CardModalStyles/action.scss'
import Button from "../ReUsableComponents/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { cardDelete } from "../../../services/listService";
import { DeleteOutlined } from "@ant-design/icons";
const Actions = () => {
  const card = useSelector((state) => state.card);
  const dispatch = useDispatch();
  return (
    <Container className="container-action">
      <Title className="container-action-title">Actions</Title>
      <Button
        clickCallback={() => {
          cardDelete(card.listId, card.boardId, card.cardId, dispatch);
        }}
        title="Delete"
        icon={<DeleteOutlined fontSize="small" />}
      ></Button>
    </Container>
  );
};

export default Actions;
