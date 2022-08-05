const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { hashPassword } = require("../src/pages/api/auth/utils");

async function main() {
  const password = await hashPassword("guestPassword!!221");

  await prisma.user.upsert({
    where: { email: "guest@gmail.com" },
    update: {},
    create: {
      email: "guest@gmail.com",
      first_name: "guest",
      last_name: "accounts",
      password,
      policy: true,

      user_address: {
        create: {
          street: "123 Guest Street",
          city: "Guestville",
          state: "default",
          postal_code: "11111",
          country: "Guest Land",
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
