import React from 'react'
import '../App.scss'
import Home from '../components/Home/Home'
import getApp from './../util/getContext'
const HomePage = () => {
  console.log(getApp())
  return (
    <div>
      <Home />
    </div>
  )
}

export default HomePage
