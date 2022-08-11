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

  await primsa.client.delete({
    where: {
      client_id,
    },
  });

  res.json({
    message: "client successfully deleted",
    status: 204,
  });

  primsa.$disconnect();
};
