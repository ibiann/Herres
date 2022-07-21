import React, { useState, useRef, useEffect } from 'react'
import '../../assets/scss/card.scss'
import {
  Modal,
  Col,
  Row,
  Comment,
  Typography,
  Input,
  Button,
  Space,
  Avatar,
  Form,
  List,
  DatePicker,
  Checkbox,
  Tag,
  Progress,
  Tooltip,
} from 'antd'
import { InlineInputEdit } from 'react-inline-input-edit'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleFilled,
  CloseCircleOutlined,
  CommentOutlined,
  MenuUnfoldOutlined,
  MessageTwoTone,
  ScheduleTwoTone,
  SyncOutlined,
  UnorderedListOutlined,
  WindowsOutlined,
} from '@ant-design/icons'
import EasyEdit, { Types } from 'react-easy-edit'
import moment from 'moment'
import { Mention, MentionsInput } from 'react-mentions'
import defaultStyle from './defaultStyle'
import defaultMentionStyle from './defaultMentionStyle'
import uuid from 'react-uuid'
import useApp from '../../util/getContext'
import { convertComment } from '../../util/comment'
import { HexColorPicker } from 'react-colorful'
import { getComments, updateCard } from '../../api/card'
import { createComment } from '../../api/comment'

const { TextArea } = Input
const CommentList = ({ comments }) => {
  return (
    <List
      dataSource={comments}
      itemLayout="horizontal"
      renderItem={(props) => {
        const { content, datetime } = props
        return (
          <Comment
            {...props}
            content={<p dangerouslySetInnerHTML={{ __html: content }}></p>}
            datetime={
              <Tooltip title={moment(datetime).format('LLLL')}>
                <span>{moment(datetime).fromNow()}</span>
              </Tooltip>
            }
          />
        )
      }}
    />
  )
}

const Editor = ({
  onSubmit,
  submitting,
  content,
  users,
  setContent,
  handleChange,
}) => {
  users = users.map((u) => {
    u.id = u._id
    u.display = u.username
    return u
  })
  return (
    <>
      <Form.Item>
        <MentionsInput
          value={content}
          style={defaultStyle}
          placeholder={'Add a comment'}
          a11ySuggestionsListLabel={'Suggested mentions'}
          onChange={(event, newValue, newPlainTextValue, mentions) => {
            handleChange(event.target.value)
          }}
        >
          <Mention
            trigger="@"
            data={users}
            style={defaultMentionStyle}
            renderSuggestion={(
              entry,
              search,
              highlightedDisplay,
              index,
              focused
            ) => {
              return (
                <Comment
                  avatar={entry.image}
                  author={entry.email}
                  content={entry.name}
                />
              )
            }}
          />
        </MentionsInput>
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          Add Comment
        </Button>
      </Form.Item>
    </>
  )
}
function Card(props) {
  const { card, column } = props
  const todoRef = useRef()
  const { board, setBoard } = useApp()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [comments, setComments] = useState([])
  const [showFormTodo, setShowFormToDo] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [todo, setTodo] = useState('')
  const [content, setContent] = useState('')
  const [process, setProcess] = useState(0)
  const {
    auth: user,
    spinLoading,
    setSpinLoading,
    setAuth,
    invitedUsers,
    setInvitedUsers,
  } = useApp()
  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value)
    console.log('Formatted Selected Time: ', dateString)
  }
  const onChangeDueDate = async (e) => {
    card.finish = e.target.checked
    const data = await updateCard(card._id, { card })
    setNewCard(data)
  }
  const onOk = async (value) => {
    if (value < moment()) {
      card.finish = false
    }
    card.dueDate = moment(value).format('DD MM YYYY hh:mm:ss')
    const data = await updateCard(card._id, { card })
    setNewCard(data)
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const handleFocus = (text) => {}

  const handleFocusOut = async (text) => {
    card.title = text
    const data = await updateCard(card._id, { card })
    setNewCard(data)
  }
  const save = async (value) => {
    card.description = value
    const data = await updateCard(card._id, { card })
    setNewCard(data)
  }

  const cancel = () => {
    console.log('Cancelled')
  }
  const handleSubmit = async () => {
    if (!content) return
    setSubmitting(true)
    setTimeout(async () => {
      setSubmitting(false)
      setContent('')
      setComments([
        ...comments,
        {
          author: user.username,
          avatar: user.image,
          content: convertComment(content),

          datetime: moment().fromNow(),
        },
      ])
      try {
        const commentData = {
          cardId: card._id,
          userId: user._id,
          content: convertComment(content),
        }
        const data = await createComment(commentData)
      } catch (error) {
        console.log(error)
      }
    }, 1000)
  }
  const setNewCard = (card) => {
    const newBoard = { ...board }
    console.log(newBoard)
    if (!newBoard.columns) return
    newBoard.columns?.forEach((col) => {
      if (col._id === column._id) {
        col.cards.forEach((cd) => {
          if (cd._id === card._id) {
            cd.card = card
          }
        })
      }
    })
    setBoard(newBoard)
  }
  const handleChange = (e) => {
    console.log(e)
    setContent(e)
  }
  const countProgress = (todoList) => {
    if (!todoList) return 0
    const doneTotal = todoList.filter((r) => r.done).length
    if (doneTotal === 0) return 0
    return 100 * (doneTotal / todoList.length)
  }
  const EditComponent = (props) => {
    return (
      <TextArea
        style={{ width: '500px', height: '120px' }}
        onChange={(e) => {
          props.setParentValue(e.target.value)
        }}
      />
    )
  }
  useEffect(() => {
    const getAllCommentsApi = async () => {
      const data = await getComments(card._id)
      data.forEach((d) => {
        d.datetime = d.createdAt
        d.author = d.user.username
        d.avatar = d.user.image
        return d
      })
      setComments(data)
    }
    setProcess(countProgress(card.todos))
    getAllCommentsApi()
  }, [board])
  return (
    <>
      <div className="card-items" onClick={showModal}>
        {board.color ? (
          <div
            style={{
              backgroundColor: card.color,
              width: '100%',
              height: '10px',
              position: 'absolute',
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
              top: 0,
              left: 0,
            }}
          ></div>
        ) : (
          <></>
        )}
        <Typography style={{ color: board.color }}>{card.title}</Typography>

        <Space
          direction="horizontal"
          align="center"
          style={{ marginTop: '5px' }}
        >
          {card.dueDate ? (
            card.finish ? (
              <Tag
                icon={<CheckCircleOutlined style={{ marginRight: '5px' }} />}
                color="success"
              >
                {moment(card.dueDate, 'DD MM YYYY hh:mm:ss').format('LL')}
              </Tag>
            ) : moment(card.dueDate, 'DD MM YYYY hh:mm:ss') < moment() ? (
              <Tag
                icon={
                  <ClockCircleOutlined
                    style={{ fontSize: '8px', marginRight: '5px' }}
                  />
                }
                color="error"
              >
                {moment(card.dueDate, 'DD MM YYYY hh:mm:ss').format('LL')}
              </Tag>
            ) : (
              <Tag
                icon={<SyncOutlined spin style={{ marginRight: '5px' }} />}
                color="processing"
              >
                {moment(card.dueDate, 'DD MM YYYY hh:mm:ss').format('LL')}
              </Tag>
            )
          ) : (
            <></>
          )}
          {comments.length > 0 ? (
            <Space
              align="center"
              direction="horizontal"
              style={{ marginTop: '3px' }}
            >
              <MessageTwoTone />
              <span>{comments.length}</span>
            </Space>
          ) : (
            <></>
          )}
          {card.todos?.length > 0 ? (
            <Space
              align="center"
              direction="horizontal"
              style={{ marginTop: '3px' }}
            >
              <ScheduleTwoTone />
              <span>
                {card.todos.filter((todo) => todo.done).length}/
                {card.todos.length}
              </span>
            </Space>
          ) : (
            <></>
          )}
        </Space>
      </div>
      <Modal
        style={{ top: 100 }}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
        bodyStyle={{
          backgroundColor: '#f4f5f7',
          paddingTop: '200px',
          position: 'relative',
        }}
        footer={null}
        closeIcon={<CloseCircleFilled style={{ fontSize: '30px' }} />}
        // closable
        // maskClosable
      >
        <Row
          style={{
            backgroundColor: card.color,
            height: '100px',
            position: 'absolute',
            width: '100%',
            top: 0,
            left: 0,
          }}
        ></Row>
        <Row>
          <Col span={18} style={{ paddingRight: '3px' }}>
            <Comment
              author={
                <InlineInputEdit
                  text={card.title}
                  inputWidth="100%"
                  labelFontWeight="bold"
                  inputFontWeight="bold"
                  inputFontSize="16px"
                  labelFontSize="16px"
                  onFocus={handleFocus}
                  onFocusOut={handleFocusOut}
                />
              }
              avatar={<WindowsOutlined style={{ fontSize: '20px' }} />}
              content={
                <Typography>
                  in board <a href="#">{board.title}</a>
                </Typography>
              }
            />
            <Comment
              author={
                <Space align="center" direction="horizontal">
                  <Typography className="modal-card-title">
                    Description
                  </Typography>
                  <Button type="text" size="small">
                    Edit
                  </Button>
                </Space>
              }
              avatar={
                <UnorderedListOutlined
                  style={{ fontSize: '20px', marginTop: '3px' }}
                />
              }
              content={
                <>
                  <EasyEdit
                    type={Types.TEXTAREA}
                    placeholder="Description"
                    saveButtonLabel={<Button type="primary">Save</Button>}
                    cancelButtonLabel={<Button>Cancel</Button>}
                    editComponent={<EditComponent />}
                    onSave={save}
                    onCancel={cancel}
                    value={card.description || 'Description'}
                  />
                  <Space direction="vertical" style={{ marginTop: '30px' }}>
                    {card.dueDate ? (
                      <>
                        <Typography
                          style={{
                            fontSize: '16px',
                            color: '#5e6c84',
                            fontWeight: 'bold',
                          }}
                        >
                          Due Date on
                        </Typography>
                        <Checkbox
                          checked={card.finish}
                          onChange={onChangeDueDate}
                        >
                          <Space direction="horizontal">
                            <Typography>
                              due date on&nbsp;
                              <span
                                style={{ color: card.finish ? 'green' : 'red' }}
                              >
                                {moment(
                                  card.dueDate,
                                  'DD MM YYYY hh:mm:ss'
                                ).format('LLLL')}
                              </span>
                            </Typography>
                            {card.finish ? (
                              <Tag
                                icon={<CheckCircleOutlined />}
                                color="success"
                              >
                                success
                              </Tag>
                            ) : (
                              <></>
                            )}
                            {!card.finish &&
                            moment() >
                              moment(card.dueDate, 'DD MM YYYY hh:mm:ss') ? (
                              <Tag icon={<CloseCircleOutlined />} color="error">
                                Expired
                              </Tag>
                            ) : (
                              <></>
                            )}
                          </Space>
                        </Checkbox>
                      </>
                    ) : (
                      <></>
                    )}
                  </Space>
                </>
              }
            />
            <Comment
              author={
                <Space
                  align="center"
                  direction="horizontal"
                  style={{ marginTop: '30px' }}
                >
                  <Typography className="modal-card-title">
                    Todo List
                  </Typography>
                </Space>
              }
              avatar={
                <ScheduleTwoTone
                  style={{ fontSize: '20px', marginTop: '29px' }}
                />
              }
              content={
                <>
                  <Progress
                    percent={process}
                    trailColor="gray"
                    style={{ marginBottom: '30px' }}
                  />

                  <Space direction="vertical">
                    <Form name="basic">
                      {card.todos?.map((todo) => (
                        <Form.Item>
                          <Space align="center" direction="horizontal">
                            <Checkbox
                              checked={todo.done}
                              onChange={async (e) => {
                                const newTodoList = [...card.todos].map((t) => {
                                  if (t.id === todo.id) {
                                    t.done = e.target.checked
                                  }
                                  return t
                                })
                                card.todos = newTodoList
                                const data = await updateCard(card._id, {
                                  card,
                                })
                                setNewCard(data)
                              }}
                            />
                            <Typography.Text delete={todo.done}>
                              {todo.name}
                            </Typography.Text>
                          </Space>
                        </Form.Item>
                      ))}

                      {showFormTodo ? (
                        <Form.Item>
                          <Form.Item style={{ marginBottom: '10px' }}>
                            <Input
                              ref={todoRef}
                              placeholder="Add Todo"
                              onChange={(e) => {
                                setTodo(e.target.value)
                              }}
                            />
                          </Form.Item>
                          <Space>
                            <Button
                              type="primary"
                              onClick={async () => {
                                const newTodoList = [...(card.todos || [])]

                                newTodoList.push({
                                  id: uuid(),
                                  name: todo,
                                  done: false,
                                })
                                console.log(newTodoList)
                                card.todos = newTodoList
                                const data = await updateCard(card._id, {
                                  card,
                                })
                                setNewCard(data)
                                setTodo('')
                                setShowFormToDo(false)
                              }}
                            >
                              Save
                            </Button>
                            <Button
                              onClick={() => {
                                setShowFormToDo(false)
                              }}
                            >
                              Cancel
                            </Button>
                          </Space>
                        </Form.Item>
                      ) : (
                        <></>
                      )}
                    </Form>

                    <Button
                      onClick={() => {
                        setShowFormToDo(true)
                      }}
                    >
                      Add To Do
                    </Button>
                  </Space>
                </>
              }
            />
            <Comment
              author={
                <Space align="center" direction="horizontal">
                  <Typography className="modal-card-title">
                    Activities
                  </Typography>
                </Space>
              }
              avatar={<MenuUnfoldOutlined style={{ fontSize: '20px' }} />}
              content={
                <>
                  {comments.length > 0 && <CommentList comments={comments} />}
                  <Comment
                    avatar={<Avatar src={user.image} alt={user.username} />}
                    content={
                      <Editor
                        handleChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        content={content}
                        setContent={setContent}
                        users={invitedUsers}
                      />
                    }
                  />
                </>
              }
            />
          </Col>
          <Col span={6}>
            <Space direction="vertical" align="start" style={{ width: '100%' }}>
              <Typography className="modal-card-title">
                Change Due Date
              </Typography>
              <DatePicker
                placeholder="Due Date"
                showTime
                onChange={onChange}
                onOk={onOk}
                defaultValue={
                  card.dueDate
                    ? moment(card.dueDate, 'DD MM YYYY hh:mm:ss')
                    : undefined
                }
              />
              <Typography className="modal-card-title">
                Change Background
              </Typography>
              <HexColorPicker
                color={card.color}
                onChange={async (value) => {
                  console.log(value)
                  card.color = value
                  const data = await updateCard(card._id, { card })
                  setNewCard(data)
                }}
              />
            </Space>
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default Card
