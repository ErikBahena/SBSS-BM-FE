import { PrismaClient } from "@prisma/client";
import { resolveWithError } from "../../global-middleware";

const primsa = new PrismaClient();

export default async (req, res) => {
  const { user_id } = req.query;

  const newClient = req.body;

  const clientInfo = {
    first_name: newClient.first_name,
    last_name: newClient.last_name,
    email: newClient.email,
    phone: newClient.phone,
  };

  const clientAddress = {
    street: newClient.street,
    city: newClient.city,
    state: newClient.state,
    country: newClient.country,
    postal_code: newClient.postal_code,
  };

  if (!user_id) {
    return resolveWithError(res, {
      status: 400,
      message: "no user_id provided",
    });
  }

  const createdClient = await primsa.client.create({
    data: {
      ...clientInfo,
      user_id,

      client_address: {
        create: {
          ...clientAddress,
        },
      },
    },
  });

  const clients = await primsa.client.findMany({
    where: {
      user_id,
    },
    select: {
      client_id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
      photo_url: true,
      created_at: true,

      client_address: {
        select: {
          client_address_id: true,
          street: true,
          city: true,
          postal_code: true,
          state: true,
          country: true,
        },
      },
    },
  });

  res.json({
    message: "client successfully added",
    status: 200,
    addedResource: createdClient,
    updatedResource: clients.map((client) => {
      client["address"] = client["client_address"][0];
      delete client["client_address"];

      return client;
    }),
  });

  primsa.$disconnect();
};
