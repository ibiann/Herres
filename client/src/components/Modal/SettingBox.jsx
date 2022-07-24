import React, { useEffect, useState } from 'react'
import './settingbox.scss'
import { MODAL_CLOSE, MODAL_CONFIRM } from '../../util/const'
import useApp from '../../util/getContext'
import { Button, Modal, Select, Form, Input, Upload, message, Spin } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { beforeUpload, getBase64 } from '../../util/upload'
import { updateUser } from '../../api/user'
import { Navigate, useNavigate } from 'react-router-dom'

function SettingBox(props) {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { show, onAction, setShow } = props
  const [loadingAction, setLoadingAction] = useState(false)
  const [validatedForm, setValidatedForm] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const [loading, setLoading] = useState(false)

  const { auth: user, spinLoading, setSpinLoading, setAuth } = useApp()
  const showModal = () => {
    setShow(true)
  }

  const handleOk = () => {
    form
      .validateFields(['name', 'username', 'image'])
      .then(() => {
        form.submit()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleCancel = () => {
    setShow(false)
  }

  const onFinish = async (values) => {
    setSpinLoading(true)
    setShow(false)
    try {
      const newUserInfo = await updateUser(user._id, values)
      setAuth(newUserInfo)
      message.success('Edit successfully')
      setSpinLoading(false)
      navigate(0)
    } catch (error) {
      setSpinLoading(false)
      setShow(false)
      message.error(error)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
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
  return (
    <Modal
      title="Basic Modal"
      visible={show}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Save"
      centered
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Name cannot empty' }]}
          initialValue={user.name}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'UserName cannot empty' }]}
          initialValue={user.username}
        >
          <Input addonBefore={'@'} />
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
  )
}

export default SettingBox
