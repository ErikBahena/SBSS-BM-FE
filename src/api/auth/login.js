import { PrismaClient } from "@prisma/client";

const primsa = new PrismaClient();

export default async (req, res) => {
  const { email, password } = req.body;

  const user = await primsa.user.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    res.status(401).json({ error: "Invalid credentials" });
  } else if (user.password !== password) {
    res.status(401).json({ error: "Invalid credentials" });
  } else {
    res.json({
      user,
      token: user.token,
      message: "Login successful",
      success: true,
      type: "login",
    });
  }
};
