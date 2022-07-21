import React, { useEffect, useRef, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import {
  Container as BootstrapContainer,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap'
import { isEmpty, cloneDeep } from 'lodash'
import '../../assets/scss/boardcon.scss'
import Column from '../BoardComponent/Column'
import { mapOrder } from '../../util/sort'
import { applyDrag } from '../../util/dragDrop'
import { initialData } from './../../api/initialData'
import {
  // eslint-disable-next-line no-unused-vars
  createColumn,
  updateColumn,
  updateCard,
} from '../../api/'
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { fetchBoard, invitedUsers, updateBoard } from '../../api/board'
import { useNavigate, useParams } from 'react-router-dom'
import { Empty, Skeleton, Spin, Modal } from 'antd'
import useApp from '../../util/getContext'
function BoardCon() {
  const params = useParams()
  const [columns, setColumns] = useState([])
  const [openNewListForm, setOpenNewListForm] = useState(false)
  const toggleOpenNewListForm = () => setOpenNewListForm(!openNewListForm)
  const navigate = useNavigate()

  const {
    spinLoading,
    setSpinLoading,
    board,
    setBoard,
    auth: user,
    invitedUsers,
  } = useApp()
  const newListInputRef = useRef(null)

  const [newListTitle, setNewListTitle] = useState('')
  const onNewListTitleChange = (e) => setNewListTitle(e.target.value)

  useEffect(() => {
    let boardDB = []
    setSpinLoading(true)
    const fetchBoardApi = async () => {
      const { id } = params
      boardDB = await fetchBoard(id)
      setSpinLoading(false)
      setBoard(boardDB)
      if (boardDB) {
        setBoard(boardDB)
        //sort columns
        boardDB.columns.sort((a, b) => {
          return boardDB.columns.indexOf(a._id) - boardDB.columns.indexOf(b)
        })
        setColumns(mapOrder(boardDB.columns, '_id'))
      }
    }
    // const checkeExistedInBoard = (invitedUsers, currentUser, board) => {
    //   let accessRight =
    //     invitedUsers.map((user) => user._id).includes(currentUser._id) ||
    //     currentUser._id === board.user_id
    //   return accessRight
    // }
    fetchBoardApi()
  }, [])

  useEffect(() => {
    if (newListInputRef && newListInputRef.current) {
      newListInputRef.current.focus()
      newListInputRef.current.select()
    }
  }, [openNewListForm])

  if (isEmpty(board)) {
    return <Skeleton />
  }

  const onColumnDrop = (dropResult) => {
    let newColumns = cloneDeep(columns)
    newColumns = applyDrag(newColumns, dropResult)

    let newBoard = cloneDeep(board)
    newBoard.columns = newColumns.map((c) => c._id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
    /* Call APi update column order for board */
    // thay 1 truong cu the
    updateBoard(newBoard._id, newBoard).catch(() => {
      setColumns(columns)
      setBoard(board)
    })
  }

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = cloneDeep(columns)

      let currentColumn = newColumns.find((c) => c._id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      // currentColumn.cards = currentColumn.cards.map((i) => i._id)

      setColumns(newColumns) //update column
      if (dropResult.removedIndex !== null && dropResult.addedIndex !== null) {
        /**
         * Moving cards inside columns
         * Calling api update the cards in column
         */
        updateColumn(currentColumn._id, {
          ...currentColumn,
          cards: currentColumn.cards.map((i) => i._id),
        })
          .then(() => {
            console.log(currentColumn)
          })
          .catch(() => {
            setColumns(columns)
          })
      } else {
        /**
         * Moving cards between columns
         */
        // Calling api update the cards in column
        updateColumn(currentColumn._id, currentColumn).catch(() => {
          setColumns(columns)
        })

        if (dropResult.addedIndex !== null) {
          let currentCard = cloneDeep(dropResult.payload)
          currentCard.columnId = currentColumn._id
          // Calling api update column in current cards, khi addedIndex khac null
          updateCard(currentCard._id, currentCard)
        }
      }
    }
  }

  const addNewList = async () => {
    if (!newListTitle) {
      newListInputRef.current.focus()
      return
    }

    const newColumnToAdd = {
      boardId: board._id,
      title: newListTitle.trim(),
    }
    // Call Api columns

    const column = await createColumn(newColumnToAdd)
    let newColumns = cloneDeep(columns)
    newColumns.push(column)
    console.log(columns)
    let newBoard = { ...board }
    newBoard.columns = newColumns.map((c) => c._id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
    setNewListTitle('')
    toggleOpenNewListForm('')
  }

  const onUpdateListColumn = (newUpdateColumn) => {
    const columnIdUpdater = newUpdateColumn._id
    console.log(newUpdateColumn)

    let newColumns = cloneDeep(columns)
    const columnIndexUpdater = newColumns.findIndex(
      (i) => i._id === columnIdUpdater
    ) //i = items

    if (newUpdateColumn._destroy) {
      newColumns.splice(columnIndexUpdater, 1)
    } else {
      newColumns.splice(columnIndexUpdater, 1, newUpdateColumn)
    }

    let newBoard = { ...board }
    newBoard.columns = newColumns.map((c) => c._id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
  }

  return (
    <div
      className="app-column-board"
      style={{
        background: `url(${board.image}) no-repeat`,
        backgroundSize: 'cover',
      }}
    >
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={(index) => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-view',
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column
              board={board}
              column={column}
              onCardDrop={onCardDrop}
              onUpdateListColumn={onUpdateListColumn}
            />
          </Draggable>
        ))}
      </Container>
      <BootstrapContainer className="merres-b4-container">
        {!openNewListForm && (
          <Row>
            <Col className="add-new-column" onClick={toggleOpenNewListForm}>
              <PlusOutlined className="mui-icon" /> Add another list
            </Col>
          </Row>
        )}
        {openNewListForm && (
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                className="input-box"
                size="sm"
                type="text"
                placeholder="Add text..."
                ref={newListInputRef}
                value={newListTitle}
                onChange={onNewListTitleChange}
                onKeyDown={(e) => e.key === 'Enter' && addNewList()}
              />
              <Button variant="outline-success" size="sm" onClick={addNewList}>
                Add list
              </Button>
              <span
                className="cancel-adding-new-column-icon"
                onClick={toggleOpenNewListForm}
              >
                <CloseCircleOutlined />
              </span>
            </Col>
          </Row>
        )}
      </BootstrapContainer>
    </div>
  )
}

export default BoardCon
