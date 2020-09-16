import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";

import { selectAuth } from "../store/auth";
import {
  fetchEmployeeList,
  selectEmployees,
  updateEmployeeList,
} from "../store/employee";
import { isAdmin, isEmployee } from "../helpers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const EmployeeList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { role, userId } = useSelector(selectAuth);
  const employeeList = useSelector(selectEmployees);
  const [tempNames, setTempNames] = useState({});

  useEffect(() => {
    const args = isEmployee(role) ? userId : null;
    fetchEmployeeList(args)(dispatch);
  }, [dispatch, role, userId]);

  const submitUpdate = (id: number) => {
    updateEmployeeList({ id, data: { name: tempNames[id] } })(
      dispatch
    );
  };

  const getAdminViewList = () => {
    return Object.keys(employeeList).map((id: any, i: number) => (
      <ListItem key={`employee_${i}`}>
        <TextField
          id={`employee-name-${id}`}
          name={`employee-name-${id}`}
          defaultValue={employeeList[id]?.name}
          onChange={(e) => setTempNames({ [id]: e.target.value })}
          value={tempNames[id]?.name}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => submitUpdate(id)}
        >
          Update
        </Button>
      </ListItem>
    ));
  };

  const getEmployeeViewList = () => {
    return Object.keys(employeeList).map((id: any, i: number) => (
      <ListItem key={`employee_${i}`}>
        <ListItemText primary={employeeList[id]?.name} />
      </ListItem>
    ));
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6">Employees</Typography>
      <div>
        <List>
          {isAdmin(role) ? getAdminViewList() : getEmployeeViewList()}
        </List>
      </div>
    </div>
  );
};

export default EmployeeList;
