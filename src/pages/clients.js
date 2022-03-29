import { addClient, getUserClients, deleteClientQFN } from "src/fetch-functions";

import ClientPage from "../components/client-employee/index";

import withAuth from "src/components/auth/with-auth";

const Clients = () => {
  return (
    <ClientPage
      addResourceFunc={addClient}
      type="client"
      popoverTitle="Add a new Client"
      mainResourceFunc={getUserClients}
      deleteResourceFunc={deleteClientQFN}
    />
  );
};

export default withAuth(Clients);
