import React, { useEffect, useRef, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form, Button } from 'react-bootstrap'
import '../../assets/scss/column.scss'
import { cloneDeep } from 'lodash'
import Card from '../BoardComponent/Card'
import Remove from '../Modal/Remove'
import { mapOrder } from '../../util/sort'
import { MODAL_CONFIRM } from '../../util/const'
import {
  selectAllTextField,
  useKeyBoardToSaveTitle,
} from '../../util/contentEditable'
import { createCard, updateColumn } from '../../api'

import {
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MenuOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import { deleteColumn } from '../../api/column'
import useApp from '../../util/getContext'
import { useNavigate } from 'react-router-dom'
import { Modal, message } from 'antd'
const { confirm } = Modal
function Column(props) {
  const { column, onCardDrop, onUpdateListColumn, board } = props
  const { cards } = column
  const [showConfirmRemove, setShowConfirmRemove] = useState(false)
  const toggleShowConfirmRemove = () => setShowConfirmRemove(!showConfirmRemove)
  const {
    boards,
    setBoards,
    spinLoading,
    setSpinLoading,
    invitedUsers,
    setInvitedUsers,
  } = useApp()
  const navigate = useNavigate()
  const [listTitle, setListTitle] = useState('')
  const handleListTitleChange = (e) => setListTitle(e.target.value)

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)

  const newCardInputTextRef = useRef(null)

  const [newCardTitle, setNewCardTitle] = useState('')
  const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value)

  useEffect(() => {
    setListTitle(column.title)
  }, [column.title])

  useEffect(() => {
    if (newCardInputTextRef && newCardInputTextRef.current) {
      newCardInputTextRef.current.focus()
      newCardInputTextRef.current.select()
    }
  }, [openNewCardForm])

  // Remove Column
  const onRemoveAction = (type) => {
    if (type === MODAL_CONFIRM) {
      const newColumn = {
        ...column,
        _destroy: true,
      }
      // Call Api update column
      updateColumn(newColumn._id, newColumn).then((updatedColumn) => {
        onUpdateListColumn(updatedColumn)
      })
    }
    toggleShowConfirmRemove()
  }

  // Update Column Title
  const handleTitleBlur = () => {
    if (listTitle !== column.title) {
      const newColumn = {
        ...column,
        title: listTitle,
      }
      newColumn.cards = cards.map((card) => card._id) || []
      updateColumn(newColumn._id, newColumn).then((updatedColumn) => {
        updatedColumn.cards = cards
        onUpdateListColumn(updatedColumn)
      })
    }
  }

  const addNewCard = async () => {
    if (!newCardTitle) {
      newCardInputTextRef.current.focus()
      return
    }
    //copy same path from content of adding new card
    const newCardToAdd = {
      columnId: column._id,
      boardId: column.boardId,
      title: newCardTitle.trim(),
    }
    const card = await createCard(newCardToAdd)
    let newColumn = cloneDeep(column)
    newColumn.cards.push(card)
    onUpdateListColumn(newColumn)
    setNewCardTitle('')
    toggleOpenNewCardForm()
  }
  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this column?',
      icon: <ExclamationCircleOutlined />,
      content: 'Please sure you want to do that,this action cannot be redone',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        setSpinLoading(true)
        try {
          const data = await deleteColumn(column._id)
          setSpinLoading(false)
          message.success('Deleted succesfully')
          // setInvitedUsers(data.invitedUsers)
          navigate(0)
        } catch (error) {
          console.log(error)
          message.error('Deleted Error')
          // navigate(0)
        }
      },
      onCancel() {},
    })
  }
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
            style={{
              color: board.color,
            }}
          />
        </div>
        <div className="dropdown-actions-list">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              size="sm"
              className="dropdown-btn"
            >
              <MenuOutlined className="dropdown-menu-icon" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleOpenNewCardForm}>
                Add card
              </Dropdown.Item>
              <Dropdown.Item onClick={showDeleteConfirm}>
                Archive this list
              </Dropdown.Item>
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
            className: 'card-drop-view',
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} board={board} column={column} />
            </Draggable>
          ))}
        </Container>

        {/* copy similar form from board content */}
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
              onKeyDown={(e) => e.key === 'Enter' && addNewCard()}
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
              <CloseCircleOutlined />
            </span>
          </div>
        )}
        {!openNewCardForm && (
          <div className="footer-action-handle" onClick={toggleOpenNewCardForm}>
            <PlusCircleOutlined className="mui-icon" />
            Add new card
          </div>
        )}
      </footer>
      <Remove
        show={showConfirmRemove}
        onAction={onRemoveAction}
        title="Remove Column"
        content={`Removing current ${column.title} ???`}
      />
    </div>
  )
}

export default Column
