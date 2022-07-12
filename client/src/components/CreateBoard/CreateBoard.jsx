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
import ColorPicker from 'rc-color-picker'
import { getBase64, beforeUpload } from '../../util/upload'

import { HexColorPicker } from 'react-colorful'
import { createBoard, getBoards } from '../../api/board'
import { getHttpResponse } from '../../util/http'
import { Link, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'
import { Grid, Pagination } from 'swiper'

const CreateBoard = () => {
  const navigate = useNavigate()
  const [modalVisible, setModalVisible] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
  const [form] = Form.useForm()
  const defaultColor = '#aabbcc'
  const [color, setColor] = useState(defaultColor)
  const [loading, setLoading] = useState(false)
  const [spinLoading, setSpinLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const [boards, setBoards] = useState([])
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
    setConfirmModal(true)
    form
      .validateFields(['title', 'image'])
      .then(() => {
        form.submit()
        setModalVisible(false)
        setConfirmModal(false)
      })
      .catch((err) => {
        console.log(err)
        setConfirmModal(false)
      })
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  const validateMessage = {
    required: '${label} is required!',
  }
  const onFinishModal = async (values) => {
    try {
      const data = await createBoard(values)
      message.success('created successfully')
      navigate(0)
    } catch (error) {
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
  console.log(modalVisible)
  useEffect(() => {
    const getBoardsApi = async () => {
      setSpinLoading(true)
      try {
        const data = await getBoards()
        setSpinLoading(false)
        setBoards(data)
      } catch (error) {
        message.error(error)
      }
    }
    getBoardsApi()
  }, [modalVisible])
  return (
    <Spin spinning={spinLoading} size="large">
      <div className="create-board-navbar">
        <AppBar boards={boards} />
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
            {boards.map((board, index) => (
              <SwiperSlide
                onClick={() => {
                  navigate(`../board/${board._id}`, { replace: true })
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
                </Card>
              </SwiperSlide>
            ))}
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
                // initialValue={color}
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

export default CreateBoard
