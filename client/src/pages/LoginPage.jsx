import React from 'react'
import { makeStyles } from '@mui/styles'
import { Typography, message } from 'antd'
import { Box, Paper } from '@mui/material'
import { useForm } from 'react-hook-form'
import logo from '../assets/img/svg/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi } from '../api/auth'
import { getHttpResponse } from '../util/http'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const useStyle = makeStyles({
  loginFormContainer: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: 'red',
    padding: 22,
  },
  input: {
    margin: '8px 0px',
  },
  loginButton: {
    backgroundColor: '#5AAC44',
    color: '#FFF',
    width: '100%',
    fontWeight: 'bold',
  },
  loginTitle: {
    color: '#606E87',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImage: {
    marginRight: 6,
    height: '6.1vh',
  },
  logoTitle: {
    fontSize: 46,
    fontWeight: 'bold',
    color: '#253959',
  },
  loginPageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
  },
})

const LoginPage = () => {
  const classes = useStyle()
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is error format')
      .required('Email is required'),
    password: Yup.string().required('Password is required').min(6).max(22),
  })

  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, setError, formState } = useForm(formOptions)
  const { errors } = formState

  const onSubmit = async (formData) => {
    try {
      const data = await loginApi(formData)
      localStorage.setItem('auth', JSON.stringify(data))
      message.success('Login Successfully')
      navigate(0)
      navigate('/boards')
    } catch (error) {
      const data = getHttpResponse(error)
      console.log(data)
      message.error(data.message)
    }
  }

  return (
    <Box className={classes.loginPageContainer}>
      <Box className={classes.logoContainer}>
        <img className={classes.logoImage} src={logo} alt="logo" />
        <Typography className={classes.logoTitle}>Trello</Typography>
      </Box>
      <Paper className={classes.loginFormContainer}>
        <Typography className={classes.loginTitle}>Login to Trello</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Username</label>
            <input
              name="email"
              type="text"
              {...register('email')}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              {...register('password')}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <button
            disabled={formState.isSubmitting}
            className="btn btn-primary w-100"
          >
            {formState.isSubmitting && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Login
          </button>
        </form>
        <hr />
        <Link to="/register">Sign up for an account</Link>
      </Paper>
    </Box>
  )
}

export default LoginPage
