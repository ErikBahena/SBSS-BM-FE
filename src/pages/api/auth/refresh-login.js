import { PrismaClient } from "@prisma/client";
import { resolveWithError } from "../global-middleware";
import { tokenBuilder } from "./utils";

const { JWT_SECRET } = process.env;

const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

export default async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);

    if (decodedToken) {
      const userFromTokenDecode = {
        first_name: decodedToken.first_name,
        last_name: decodedToken.last_name,
        email: decodedToken.email,
        user_id: decodedToken.user_id,
      };

      return res.json({
        user: { ...userFromTokenDecode },
        token: tokenBuilder(userFromTokenDecode),
        message: "login successful",
        success: true,
        status: 200,
      });
    }
  } catch (err) {
    return resolveWithError(res, {
      status: 401,
      message: err.message,
      name: "token",
    });
  }

  prisma.$disconnect();
};
