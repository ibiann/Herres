import React from 'react';
import {makeStyles} from "@mui/styles";
import {Button, Input, Typography} from "antd";
import {Box, Link, Paper} from "@mui/material";
import TrelloLogo from '../assets/trello_logo_icon_189227.png'
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
        marginRight: 6
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
    return (
        <Box className={classes.loginPageContainer}>
            <Box className={classes.logoContainer}>
                <img className={classes.logoImage} src={TrelloLogo} alt="logo"/>
                <Typography  className={classes.logoTitle}>Trello</Typography>
            </Box>
            <Paper className={classes.loginFormContainer}>
                <Typography className={classes.loginTitle}  >Sign up for your account</Typography>
                <form>
                    <Input className={classes.input} placeholder={'Enter name'}  />
                    <Input className={classes.input} placeholder={'Enter surname'}  />
                    <Input className={classes.input} placeholder={'Enter email'} type={'email'} />
                    <Input className={classes.input} placeholder={'Enter password'} type={'password'} />
                    <Input className={classes.input} placeholder={'Confirm password'} type={'password'} />
                    <Button className={classes.loginButton}>Complete</Button>
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
