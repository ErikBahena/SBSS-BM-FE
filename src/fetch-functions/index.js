import { axiosWithAuth } from "../utils";

// user client crud functions
export const getUserClients = async (user_id) => {
  const { data } = await axiosWithAuth().get(`/client/getAll/${user_id}`);

  return data;
};
export const addClient = async (newClient) => {
  const { data } = await axiosWithAuth().post(`/client/add`, newClient);

  return data;
};

// user employee crud functions

export const getUserEmployees = async (user_id) => {
  const { data } = await axiosWithAuth().get(`/employee/getAll/${user_id}`);

  return data;
};

export const addEmployee = async (newEmployee) => {
  const { data } = await axiosWithAuth().post(`/employee/add`, newEmployee);

  return data;
};

// user job crud functions
export const getUserJobs = async (user_id) => {
  const { data } = await axiosWithAuth().get(`/job/user-jobs/${user_id}`);

  return data;
};

export const deleteJobEmployeeQFN = async ({ job_id, employee_id }) => {
  return await axiosWithAuth().delete(`/job/delete-employee/${job_id}/${employee_id}`);
};
