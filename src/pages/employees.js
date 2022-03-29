import { getUserEmployees, addEmployee, deleteEmployeeQFN } from "src/fetch-functions";

import EmployeePage from "../components/client-employee/index";

import withAuth from "src/components/auth/with-auth";

const Employees = () => {
  return (
    <EmployeePage
      addResourceFunc={addEmployee}
      type="employee"
      popoverTitle="Add an Employee"
      mainResourceFunc={getUserEmployees}
      deleteResourceFunc={deleteEmployeeQFN}
    />
  );
};

export default withAuth(Employees);
