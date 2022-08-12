import { PrismaClient } from "@prisma/client";
import { resolveWithError } from "../global-middleware";
import { comparePasswords, tokenBuilder } from "./utils";

const primsa = new PrismaClient();

export default async (req, res) => {
  const { email, password } = req.body;

  const userFromDb = await primsa.user.findUnique({
    where: {
      email,
    },
    select: {
      first_name: true,
      last_name: true,
      email: true,
      user_id: true,
      password: true,
    },
  });

  if (!userFromDb) {
    return resolveWithError(res, {
      status: 400,
      message: "email not in use",
      name: "email",
    });
  }

  const passwordsMatch = await comparePasswords(password, userFromDb.password);

  if (passwordsMatch) {
    return res.json({
      user: { ...userFromDb, password: undefined },
      token: tokenBuilder(userFromDb),
      message: "sign in successful",
      success: true,
      status: 200,
    });
  }

  if (!passwordsMatch) {
    return resolveWithError(res, {
      status: 401,
      message: "invalid password",
      name: "password",
    });
  }

  primsa.$disconnect();
};
