import { PrismaClient } from "@prisma/client";
import { resolveWithError } from "../../global-middleware";

const primsa = new PrismaClient();

export default async (req, res) => {
  const { client_id } = req.query;

  if (!client_id) {
    return resolveWithError(res, {
      status: 400,
      message: "no client_id provided",
    });
  }

  const deletedClient = await primsa.client.delete({
    where: {
      client_id,
    },
  });

  const clients = await primsa.client.findMany({
    where: {
      user_id: deletedClient.user_id,
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
    message: "client successfully deleted",
    status: 200,
    deletedResource: deletedClient,
    updatedResource: clients.map((client) => {
      client["address"] = client["client_address"][0];
      delete client["client_address"];

      return client;
    }),
  });

  primsa.$disconnect();
};
