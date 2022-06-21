import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Input, Typography } from "antd";
import { Box, Link, Paper } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import TrelloLogo from "../assets/trello_logo_icon_189227.png";
import { loginAction } from "../redux/reducers/auth";
import { useNavigate } from "react-router-dom";
const useStyle = makeStyles({
  loginFormContainer: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "red",
    padding: 22,
  },
  input: {
    margin: "8px 0px",
  },
  loginButton: {
    backgroundColor: "#5AAC44",
    color: "#FFF",
    width: "100%",
    fontWeight: "bold",
  },
  loginTitle: {
    color: "#606E87",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 40,
  },
  logoImage: {
    marginRight: 6,
  },
  logoTitle: {
    fontSize: 46,
    fontWeight: "bold",
    color: "#253959",
  },
  loginPageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
  },
});

const LoginPage = () => {
  const classes = useStyle();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { control, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const submitLogin = (form) => {
    dispatch(loginAction({ data: form, cb: () => {
        navigate('/')
    }}))
  };

  return (
    <Box className={classes.loginPageContainer}>
      <Box className={classes.logoContainer}>
        <img className={classes.logoImage} src={TrelloLogo} alt="logo" />
        <Typography className={classes.logoTitle}>Trello</Typography>
      </Box>
      <Paper className={classes.loginFormContainer}>
        <Typography className={classes.loginTitle}>Login to Trello</Typography>
        <form>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className={classes.input}
                placeholder={"Enter email"}
                type={"email"}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className={classes.input}
                placeholder={"Enter password"}
                type={"password"}
              />
            )}
          />

          <Button
            onClick={handleSubmit(submitLogin)}
            className={classes.loginButton}
          >
            Login
          </Button>
          <hr />
          <Link href={"/register"}>Sign up for an account</Link>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
