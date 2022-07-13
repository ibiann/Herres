import React, { useState, useEffect } from 'react'
import '../../assets/scss/appbar.scss'
import { Container as BootstrapContainer, Row, Col } from 'react-bootstrap'
import { cloneDeep } from 'lodash'
import SettingBox from '../Modal/SettingBox'
import { MODAL_CONFIRM } from '../../util/const'
import { Dropdown, Menu, Tooltip, Button, Input } from 'antd'
import logo from '../../assets/img/logo.png'

import {
  HomeFilled,
  ProjectOutlined,
  CloseOutlined,
  LoginOutlined,
  RetweetOutlined,
  IdcardOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import useApp from '../../util/getContext'
import { getBoardsRecent } from '../../api/board'

function AppBar({ boards }) {
  // const { Search } = Input
  const [recentBoards, setRecentBoards] = useState([])
  const onSearch = (value) => {
    return value
  }

  const navigate = useNavigate()
  const [showSettingBox, setShowSettingBox] = useState(false)
  const toggleShowSettingBox = () => {
    setShowSettingBox(!showSettingBox)
  }

  const onSettingAction = (type) => {
    if (type === MODAL_CONFIRM) {
      console.log('')
    }
    toggleShowSettingBox()
  }

  const [handleLoading, setHandleLoading] = useState([])

  const handleEnterLoading = (index) => {
    setHandleLoading((handlePrevLoading) => {
      const enterNewLoading = cloneDeep(handlePrevLoading)
      enterNewLoading[index] = true
      return enterNewLoading
    })
    setTimeout(() => {
      setHandleLoading((handlePrevLoading) => {
        const enterNewLoading = cloneDeep(handlePrevLoading)
        enterNewLoading[index] = false
        return enterNewLoading
      })
    }, 5000)
  }
  useEffect(() => {
    const getBoardsRecentApi = async () => {
      const data = await getBoardsRecent(3)
      setRecentBoards(data)
    }
    getBoardsRecentApi()
  }, [])
  const menuAva = (
    <Menu>
      <Menu.Item key="1" onClick={toggleShowSettingBox}>
        <IdcardOutlined
          style={{
            color: 'rgb(83, 82, 237)',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '8px',
          }}
        />
        <span>Settings</span>
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          localStorage.removeItem('auth')
          navigate(0)
          navigate('/', { replace: true })
        }}
      >
        <LoginOutlined
          style={{
            color: 'rgb(255, 71, 87)',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '8px',
          }}
        />
        <span>Log out</span>
      </Menu.Item>
    </Menu>
  )
  return (
    <nav className="app-navbar-top">
      <BootstrapContainer className="appbar-container">
        <Row>
          <Col xs={6} md={4} className="col-no-padding">
            <div className="action-apps">
              <div className="items-left home">
                <a href={'/create'} target="_self">
                  <HomeFilled />
                </a>
              </div>
              <div className="items-left recent-boards">
                <Dropdown
                  overlay={
                    <Menu
                      items={recentBoards.map((r, index) => {
                        return {
                          key: index,
                          label: <Link to={`boards/${r._id}`}>{r.title}</Link>,
                        }
                      })}
                    />
                  }
                  trigger={['click']}
                  className="rec-board-dropdown"
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <ProjectOutlined />
                    &nbsp;&nbsp;
                    <span className="text-element">Recent Board</span>
                  </a>
                </Dropdown>
              </div>
              <div className="items-left searching-bar">
                <Tooltip
                  title={<span>Type here</span>}
                  placement="bottomLeft"
                  trigger="focus"
                  className="tooltip-searching-bar"
                >
                  <Input
                    placeholder="Search here...."
                    allowClear={{
                      clearIcon: <CloseOutlined style={{ color: '#e74c3c' }} />,
                    }}
                    onchange={onSearch}
                    style={{
                      width: 200,
                    }}
                  />
                  <Tooltip
                    title={<span>Must type to search</span>}
                    placement="bottomLeft"
                  >
                    <Button
                      type="primary"
                      icon={<SearchOutlined />}
                      loading={handleLoading[2]}
                      onClick={() => handleEnterLoading(2)}
                      className="searching-btn-handle"
                    />
                  </Tooltip>
                </Tooltip>
              </div>
            </div>
          </Col>
          <Col xs={6} md={4} className="col-no-padding">
            <div className="app-branding text">
              <a href="/create" target="_self">
                <img src={logo} className="logo-top" alt="merres-logo" />
                <div className="logo-app-name-container">
                  <span className="logo-app-name">Merres</span>
                </div>
              </a>
            </div>
          </Col>
          <Col xs={6} md={4} className="col-no-padding">
            <div className="user-action">
              <Dropdown overlay={menuAva} placement="topRight" arrow>
                <div
                  className="items-right user"
                  onClick={(e) => e.preventDefault()}
                >
                  <img
                    src="https://picsum.photos/id/1/200/300"
                    alt="avatar-user"
                  />
                </div>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </BootstrapContainer>
      <SettingBox show={showSettingBox} onAction={onSettingAction} />
    </nav>
  )
}

export default AppBar
