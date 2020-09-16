import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

import { fetchLoginStatus, selectAuth } from "../store/auth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    gridContainer: {
      textAlign: "center",
      margin: "3rem",
      width: "20rem",
    },
    submit: {
      padding: "1rem 0",
    },
  })
);

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { role } = useSelector(selectAuth);

  if (role) {
    history.push("/");
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      fetchLoginStatus(values)(dispatch);
    },
  });

  return (
    <div className={classes.root}>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <form onSubmit={formik.handleSubmit}>
              <Container>
                <Typography variant="h6" gutterBottom>
                  Login
                </Typography>
              </Container>
              <Container>
                <TextField
                  id="Username"
                  label="Username"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                <TextField
                  id="Password"
                  label="Password"
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </Container>
              <Container className={classes.submit}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Container>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
