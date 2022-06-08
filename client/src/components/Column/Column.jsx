import React, { useEffect, useRef, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { Dropdown, Form, Button } from "react-bootstrap";
import { cloneDeep } from "lodash";
import "./column.scss";
import Card from "../Card/Card";
import Remove from "../Dialogue/Remove";
import { mapOrder } from "../../util/sort";
import { MODAL_CONFIRM } from "../../util/const";
import {
  selectAllTextField,
  useKeyBoardToSaveTitle,
} from "../../util/contentEditable";
import { createCard, updateColumn } from "../../actions/Api";

import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

function Column(props) {
  const { column, onCardDrop, onUpdateList } = props;
  const cards = mapOrder(column.cards, column.cardOrder, "_id");

  const [showConfirmRemove, setShowConfirmRemove] = useState(false);
  const toggleShowConfirmRemove = () =>
    setShowConfirmRemove(!showConfirmRemove);

  const [listTitle, setListTitle] = useState("");
  const handleListTitleChange = (e) => setListTitle(e.target.value);

  const [openNewCardForm, setOpenNewCardForm] = useState(false);
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm);

  const newCardInputTextRef = useRef(null);

  const [newCardTitle, setNewCardTitle] = useState("");
  const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value);

  useEffect(() => {
    setListTitle(column.title);
  }, [column.title]);

  useEffect(() => {
    if (newCardInputTextRef && newCardInputTextRef.current) {
      newCardInputTextRef.current.focus();
      newCardInputTextRef.current.select();
    }
  }, [openNewCardForm]);

  // Remove Column
  const onRemoveAction = (type) => {
    if (type === MODAL_CONFIRM) {
      const newColumn = {
        ...column,
        _destroy: true,
      };
      // Call Api update column
      updateColumn(newColumn._id, newColumn).then((updatedColumn) => {
        onUpdateList(updatedColumn);
      })
    }
    toggleShowConfirmRemove();
  };

  // Update Column Title
  const handleTitleBlur = () => {
    if (listTitle !== column.title) {
      const newColumn = {
        ...column,
        title: listTitle,
      }
      // Call Api update column
      updateColumn(newColumn._id, newColumn).then((updatedColumn) => {
        updatedColumn.cards = newColumn.cards;
        onUpdateList(updatedColumn);
      })
    }
  };

  const addNewCard = () => {
    if (!newCardTitle) {
      newCardInputTextRef.current.focus();
      return;
    }
    //copy same path from content of adding new card
    const newCardToAdd = {
      columnId: column._id,
      boardId: column.boardId,
      title: newCardTitle.trim(),
    };
    // Call Api cards
    createCard(newCardToAdd).then((card) => {
      let newColumn = cloneDeep(column);
      newColumn.cards.push(card);
      newColumn.cardOrder.push(newCardToAdd._id);

      onUpdateList(newColumn);
      setNewCardTitle("");
      toggleOpenNewCardForm();
    });
  };

  return (
    <div className="columns">
      <header className="column-drag-handle">
        <div className="column-list-title">
          <Form.Control
            size="sm"
            type="text"
            value={listTitle}
            className="list-name-editable"
            onClick={selectAllTextField}
            onChange={handleListTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={useKeyBoardToSaveTitle}
            onMouseDown={(e) => e.preventDefault()}
            spellCheck="false"
          />
        </div>
        <div className="dropdown-actions-list">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              size="sm"
              className="dropdown-btn"
            >
              <MenuIcon className="dropwdown-menu-icon" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleOpenNewCardForm}>
                Add Card
              </Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmRemove}>
                Remove
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">Move Cards</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        <Container
          //react-dnd
          groupName="col"
          orientation="vertical"
          onDrop={(dropResult) => onCardDrop(column._id, dropResult)}
          getChildPayload={(index) => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "card-drop-view",
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
        {/* copy similiar form from board content */}
        {openNewCardForm && (
          <div className="add-new-card">
            <Form.Control
              size="sm"
              as="textarea"
              row="3"
              placeholder="Enter a title for this card..."
              className="add-new-card-text-box"
              ref={newCardInputTextRef}
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              onKeyDown={(e) => e.key === "Enter" && addNewCard()}
            />
          </div>
        )}
      </div>
      <footer>
        {openNewCardForm && (
          <div className="add-new-card-handle">
            <Button variant="outline-success" size="sm" onClick={addNewCard}>
              Add card
            </Button>
            <span
              className="cancel-adding-new-column-icon"
              onClick={toggleOpenNewCardForm}
            >
              <DeleteSweepIcon />
            </span>
          </div>
        )}
        {!openNewCardForm && (
          <div className="footer-action-handle" onClick={toggleOpenNewCardForm}>
            <AddIcon className="mui-icon" />
            Add new card
          </div>
        )}
      </footer>
      <Remove
        show={showConfirmRemove}
        onAction={onRemoveAction}
        title="Remove Column"
        content={`bruh ${column.title} bruh`}
      />
    </div>
  );
}

export default Column;
