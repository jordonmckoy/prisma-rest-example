import React from "react";
import MainLayout from "../layouts/main";
import EmployeeList from "../containers/EmployeeList";

const Dashboard = () => {
  return (
    <MainLayout>
      <EmployeeList />
    </MainLayout>
  );
};

export default Dashboard;
