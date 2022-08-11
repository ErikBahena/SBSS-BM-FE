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
    user_id,
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

  await primsa.client.create({
    data: {
      ...clientInfo,
      client_address: {
        create: {
          ...clientAddress,
        },
      },
    },
  });

  res.json({
    message: "client added",
    status: 200,
  });

  primsa.$disconnect();
};
