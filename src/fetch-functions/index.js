import axiosWithAuth from "src/utils/axiosWithAuth";

export const getUserClients = async (user_id) => {
  const { data } = await axiosWithAuth().get(`/client/getAll/${user_id}`);

  return data;
};

export const addClient = async (newClient) => {
  const { data } = await axiosWithAuth().post(`/client/add`, newClient);

  return data;
};
