import React, { useState, useEffect } from 'react'
import AppBar from '../BoardPage/AppBar'
import {
  Card,
  Col,
  Row,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Spin,
  Empty,
  Typography,
} from 'antd'
import '../../assets/scss/createboard.scss'
import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SettingOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import 'rc-color-picker/assets/index.css'
import { getBase64, beforeUpload } from '../../util/upload'

import { HexColorPicker } from 'react-colorful'
import { createBoard, getBoards } from '../../api/board'
import { getHttpResponse } from '../../util/http'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'
import { Grid, Pagination } from 'swiper'
import useApp from '../../util/getContext'

const BoardsBox = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [modalVisible, setModalVisible] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
  const [form] = Form.useForm()
  const defaultColor = '#aabbcc'
  const [color, setColor] = useState(defaultColor)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const {
    boards,
    setBoards,
    spinLoading,
    setSpinLoading,
    invitedUsers,
    auth: user,
  } = useApp()
  const handleChangeColor = (color) => {
    setColor(color)
    form.setFieldsValue({ color })
  }

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  }

  const showModal = () => {
    setModalVisible(true)
  }

  const handleConfirm = () => {
    form
      .validateFields(['title', 'image'])
      .then(() => {
        form.submit()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  const validateMessage = {
    required: '${label} is required!',
  }

  const onFinishModal = async (values) => {
    setSpinLoading(true)
    setModalVisible(false)
    try {
      const data = await createBoard(values)
      message.success('created successfully')
      setSpinLoading(false)
      navigate(0)
    } catch (error) {
      setModalVisible(false)
      const data = getHttpResponse(error)
      message.error(data)
      navigate(0)
    }
  }

  const handleChange = (info) => {
    const imgURL = URL.createObjectURL(info.file)
    console.log(info.file)
    getBase64(info.file, (base64Data) => {
      form.setFieldsValue({ image: base64Data })
    })
    setImageUrl(imgURL)
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )

  useEffect(() => {
    const search = searchParams.get('search')
    const getBoardsApi = async () => {
      setSpinLoading(true)

      try {
        const data = await getBoards(search)
        setSpinLoading(false)
        setBoards(data)
      } catch (error) {
        setSpinLoading(false)
        message.error(error)
      }
    }

    getBoardsApi()
  }, [modalVisible])

  return (
    <Spin spinning={spinLoading} size="large">
      <div className="create-board-navbar">
        <AppBar />(
        <div className="create-container">
          <Button type="primary" onClick={showModal} className="add-board-icon">
            <PlusOutlined />
          </Button>
          <Swiper
            slidesPerView={4}
            grid={{
              rows: 1,
            }}
            spaceBetween={15}
            pagination={{
              clickable: true,
            }}
            modules={[Grid, Pagination]}
            className="list-board"
          >
            {boards.length <= 0 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              boards.map((board, index) => (
                <SwiperSlide
                  onClick={() => {
                    navigate(`/boards/${board._id}`)
                  }}
                >
                  <Card
                    className="list-board__item"
                    cover={
                      <img
                        alt="board"
                        src={board.image}
                        className="list-board__item-img"
                      />
                    }
                    style={{ color: `${board.color}` }}
                  >
                    <p>{board.title}</p>
                    <SettingOutlined style={{ color: `${board.color}` }} />
                    <Typography.Text
                      mark
                      style={{ display: 'block', marginTop: '10px' }}
                    >{`${
                      user.email === board.user[0].email
                        ? ''
                        : board.user[0].email
                    }`}</Typography.Text>
                  </Card>
                </SwiperSlide>
              ))
            )}
          </Swiper>

          <Modal
            title="Create Board"
            visible={modalVisible}
            maskClosable={false}
            centered
            confirmLoading={confirmModal}
            onOk={handleConfirm}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                <CloseOutlined />
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={confirmModal}
                onClick={handleConfirm}
                htmlType="submit"
              >
                <CheckOutlined />
              </Button>,
            ]}
          >
            <Form
              {...layout}
              form={form}
              name="nest-message"
              onFinish={onFinishModal}
              validateMessage={validateMessage}
            >
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    form.setFieldsValue('title', e.target.value)
                  }}
                />
              </Form.Item>
              <Form.Item
                name="color"
                label="Color"
                rules={[
                  {
                    required: true,
                  },
                ]}
                initialValue={color}
              >
                <div style={{ margin: '6px 0 0 0' }}>
                  <HexColorPicker color={color} onChange={handleChangeColor} />
                </div>
              </Form.Item>
              <Form.Item name="image" label="Image">
                <Upload
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  multiple={false}
                  accept="image/*"
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{
                        width: '50px',
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </Spin>
  )
}

export default BoardsBox
