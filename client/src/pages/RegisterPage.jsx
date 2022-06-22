import React from 'react';
import {makeStyles} from "@mui/styles";
import {Button, Input, Typography} from "antd";
import {Box, Link, Paper} from "@mui/material";
import logo from '../assets/imgs/logo.png'
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import http from '../config/http';

const useStyle = makeStyles({
    loginFormContainer: {
        width: '100%',
        maxWidth: 320,
        backgroundColor: 'red',
        padding: 22
    },
    input: {
        margin: '8px 0px'
    },
    loginButton: {
        backgroundColor: '#5AAC44',
        color: '#FFF',
        width: '100%',
        fontWeight: 'bold'
    },
    loginTitle: {
        color: '#606E87',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 40
    },
    logoImage: {
        marginRight: 6,
        height: '6.1vh'
    },
    logoTitle: {
        fontSize: 46,
        fontWeight: 'bold',
        color: '#253959'
    },
    loginPageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column',
        height: '100vh'
    }
});


const RegisterPage = () => {
    const classes = useStyle();
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm({
        defaultValues: { name: "", sername: "", email: "", password: "", confirmPassword: "" },
      });
    const submitRegister = (data) => {
        console.log('data', data);
        http.post('/user/register', data).then(res => {
            if(res.data.success) navigate('/login')
        })
    }
    return (
        <Box className={classes.loginPageContainer}>
            <Box className={classes.logoContainer}>
                <img className={classes.logoImage} src={logo} alt="logo"/>
                <Typography  className={classes.logoTitle}>Trello</Typography>
            </Box>
            <Paper className={classes.loginFormContainer}>
                <Typography className={classes.loginTitle} >Sign up for your account</Typography>
                <form>
                    <Controller
                        control={control}
                        name='name'
                        render={({field}) => (
                            <Input {...field} className={classes.input} placeholder={'Enter name'}  />
                        )}
                    />
                    <Controller
                        control={control}
                        name='sername'
                        render={({field}) => (
                            <Input {...field} className={classes.input} placeholder={'Enter sername'}  />
                        )}
                    />
                    <Controller
                        control={control}
                        name='email'
                        render={({field}) => (
                            <Input {...field} className={classes.input} placeholder={'Enter email'}  />
                        )}
                    />
                    <Controller
                        control={control}
                        name='password'
                        render={({field}) => (
                            <Input {...field} className={classes.input} placeholder={'Enter password'}  />
                        )}
                    />
                    <Controller
                        control={control}
                        name='confirmPassword'
                        render={({field}) => (
                            <Input {...field} className={classes.input} placeholder={'Confirm password'}  />
                        )}
                    />
                    <Button onClick={handleSubmit(submitRegister)} className={classes.loginButton}>Complete</Button>
                    <hr/>
                    <Link href={'/login'}>
                        Already have a account? Log in
                    </Link>
                </form>
            </Paper>
        </Box>
    );
};

export default RegisterPage;
