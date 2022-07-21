import React, { useState, useContext, useEffect } from 'react'
import '../../assets/scss/appboard.scss'
import {
  Divider,
  Input,
  Select,
  Typography,
  Space,
  Avatar,
  Modal,
  Comment,
  Form,
  message,
  Spin,
} from 'antd'
import { Container as BootstrapContainer, Row, Col } from 'react-bootstrap'
import {
  CloseOutlined,
  CoffeeOutlined,
  ContactsOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'
import { getUsers } from '../../api/user'
import { MentionsInput, Mention } from 'react-mentions'

import {
  getCanUsersInvited,
  getUsersInvited,
  invitedUsers as invitedUsersApi,
} from '../../api/board'
import { useNavigate, useParams } from 'react-router-dom'
import useApp from '../../util/getContext'

const { Option } = Select

function AppBoard() {
  const [modalVisible, setModalVisible] = useState(false)
  const [form] = Form.useForm()
  const { id: boardId } = useParams()
  const { Paragraph } = Typography
  const [canInvitedUser, setcanInvitedUser] = useState([])
  const [lengthLimitText, setLengthLimitText] = useState('Custom Board')
  const [itemDropDownList, SetItemDropDownList] = useState([])
  const [nameItemList, setNameItemList] = useState('')
  const {
    boards,
    setBoards,
    spinLoading,
    setSpinLoading,
    invitedUsers,
    setInvitedUsers,
  } = useApp()
  const navigate = useNavigate()
  const [uploadingFile, setUploadingFile] = useState(null)

  const handleChangeUpload = function loadFile(e) {
    if (e.target.files.length > 0) {
      const uploadingFile = URL.createObjectURL(e.target.files[0])
      setUploadingFile(uploadingFile)
    }
  }

  const onNameItemListChange = (e) => {
    setNameItemList(e.target.value)
  }

  const addItem = (e) => {
    e.preventDefault()
    SetItemDropDownList([
      ...itemDropDownList,
      // eslint-disable-next-line no-undef
      nameItemList || `No title ${index++}`,
    ])
    setNameItemList('')
  }
  const onFinishForm = async (values) => {
    setSpinLoading(true)
    try {
      const data = await invitedUsersApi(boardId, values.invited_users)
      console.log(data)
      setSpinLoading(false)
      message.success('Invited succesfully')
      // setInvitedUsers(data.invitedUsers)
      navigate(0)
    } catch (error) {
      message.error(error)
    }
  }
  const handleConfirm = async () => {
    setModalVisible(false)
    form
      .validateFields(['invited_users'])
      .then(() => {
        form.submit()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }
  useEffect(() => {
    const getUsersApi = async () => {
      const invitedUsers = await getUsersInvited(boardId)
      const canInvitedUserData = await getCanUsersInvited(boardId)
      setInvitedUsers(invitedUsers.slice(0, 4))
      setcanInvitedUser(canInvitedUserData)
    }
    getUsersApi()
  }, [])
  return (
    <Spin spinning={spinLoading}>
      <nav className="app-navbar-board">
        <BootstrapContainer className="app-board-container">
          <Row>
            <Col sm={10} xs={12} className="col-no-padding">
              <div className="board-navbar-info">
                <div className="items board-logo-icon">
                  <CoffeeOutlined />
                  &nbsp;&nbsp;<strong>Merres</strong>
                </div>
                <div className="divider" />

                <Paragraph
                  style={{
                    margin: 8,
                    marginLeft: 12,
                    padding: 2,
                    fontWeight: 'bold',
                  }}
                  editable={{
                    onChange: setLengthLimitText,
                    maxlength: 6,
                    tooltip: false,
                    enterIcon: null,
                    autoSize: { maxRows: 1, minRows: 1 },
                  }}
                  className="items board-type"
                >
                  {lengthLimitText}
                </Paragraph>

                <div className="divider" />
                <div className="items avatar">
                  <Avatar.Group>
                    {invitedUsers.map((user, index) => (
                      <Avatar
                        key={index}
                        size={{
                          sm: 32,
                        }}
                        src={user.image}
                        alt="img"
                      />
                    ))}

                    <Avatar
                      size={{
                        sm: 32,
                      }}
                      alt="img"
                    >
                      <PlusOutlined className="add-user-icon" />
                    </Avatar>
                  </Avatar.Group>
                  <span
                    className="inviting"
                    onClick={() => {
                      setModalVisible(true)
                    }}
                  >
                    <ContactsOutlined />
                    <strong>Invite</strong>
                  </span>
                  <Modal
                    title="Invite Users"
                    visible={modalVisible}
                    onOk={handleConfirm}
                    onCancel={() => setModalVisible(false)}
                  >
                    <Form form={form} onFinish={onFinishForm}>
                      <Form.Item
                        label={<UserOutlined size="large" />}
                        name="invited_users"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your invited_users!',
                          },
                        ]}
                      >
                        <Select
                          mode="multiple"
                          style={{
                            width: '100%',
                          }}
                          placeholder="Invite users by gmail"
                          defaultValue={[]}
                          onChange={handleChange}
                          optionLabelProp="label"
                          optionFilterProp="label"
                        >
                          {canInvitedUser.map((user) => (
                            <Option value={user._id} label={user.email}>
                              <Comment
                                author={user.email}
                                avatar={user.image}
                                content={user.username}
                              />
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Form>
                  </Modal>
                </div>
              </div>
            </Col>
            <Col sm={2} xs={12} className="col-no-padding">
              <div className="board-actions">
                <div className="items menu">
                  <IconButton aria-label="delete">
                    <a href="/create" target="_self">
                      <DeleteIcon />
                    </a>
                  </IconButton>
                </div>
              </div>
            </Col>
          </Row>
        </BootstrapContainer>
      </nav>
    </Spin>
  )
}

export default AppBoard
