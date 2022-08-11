import { PrismaClient } from "@prisma/client";
import { resolveWithError } from "../global-middleware";
import { hashPassword } from "./utils";

const primsa = new PrismaClient();

export default async (req, res, next) => {
  const { email, first_name, last_name, password, policy } = req.body;

  const user = await primsa.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return resolveWithError(res, {
      status: 400,
      message: "email already in use",
      name: "email",
    });
  } else {
    const hashedPassword = await hashPassword(password);

    const newUser = await primsa.user.create({
      data: {
        email,
        first_name,
        last_name,
        password: hashedPassword,
        policy,
      },
    });

    res.json({
      user: newUser,
      token: newUser.token,
      message: "Registration successful",
      success: true,
      type: "register",
    });
  }

  primsa.$disconnect();
};
