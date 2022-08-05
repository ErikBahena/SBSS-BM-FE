const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { hashPassword } = require("../src/pages/api/auth/utils");
const { lorem } = require("./utils");

async function main() {
  const propertyNames = Object.getOwnPropertyNames(prisma);
  const modelNames = propertyNames.filter((propertyName) => !propertyName.startsWith("_"));

  await Promise.all(modelNames.map((model) => prisma[model].deleteMany()));

  const password = await hashPassword("guestPassword!!221");

  const res = await prisma.user.upsert({
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

      client: {
        createMany: {
          data: [
            {
              first_name: "Breanna",
              last_name: "Kinney",
              email: "maecenas@protonmail.edu",
              phone: "1-974-392-0754",
            },
            {
              first_name: "Eaton",
              last_name: "Lane",
              email: "ligula.eu@hotmail.com",
              phone: "1-245-626-9333",
            },
            {
              first_name: "Keane",
              last_name: "Kane",
              email: "cum.sociis.natoque@protonmail.net",
              phone: "(426) 210-7266",
            },
            {
              first_name: "Amal",
              last_name: "Christian",
              email: "a.mi.fringilla@google.org",
              phone: "(676) 503-1172",
            },
            {
              first_name: "Shelly",
              last_name: "Finch",
              email: "nec.malesuada.ut@icloud.net",
              phone: "(684) 291-2938",
            },
          ],
        },
      },

      employee: {
        createMany: {
          data: [
            {
              email: "id.risus@icloud.org",
              first_name: "Cheryl",
              last_name: "Ashley",
              phone: "(135) 339-4965",
            },
            {
              email: "ac.arcu@protonmail.com",
              first_name: "Wallace",
              last_name: "Bradford",
              phone: "(686) 818-3252",
            },
            {
              email: "luctus@icloud.org",
              first_name: "Nevada",
              last_name: "Roach",
              phone: "1-576-538-2158",
            },
            {
              email: "leo.in.lobortis@protonmail.net",
              first_name: "Kaseem",
              last_name: "Knowles",
              phone: "1-682-447-2586",
            },
            {
              email: "dis.parturient@outlook.edu",
              first_name: "Germaine",
              last_name: "Peters",
              phone: "(513) 349-6554",
            },
          ],
        },
      },
    },
    select: {
      user_id: true,
      client: {
        select: {
          client_id: true,
        },
      },
      employee: {
        select: {
          employee_id: true,
        },
      },
    },
  });

  // go over each user.client and call an async function to create a client_address for each client
  for (const clientId of res.client) {
    await prisma.client_address.create({
      data: {
        street: lorem.generateWords(3),
        city: lorem.generateWords(1),
        state: "default",
        postal_code: "11111",
        country: lorem.generateWords(2),
        client: {
          connect: {
            client_id: clientId.client_id,
          },
        },
      },
    });
  }

  // go over each res.employee and call an async function to create a employee_address for each employee
  for (const employeeId of res.employee) {
    await prisma.employee_address.create({
      data: {
        street: lorem.generateWords(3),
        city: lorem.generateWords(1),
        state: "default",
        postal_code: "11111",
        country: lorem.generateWords(2),
        employee: {
          connect: {
            employee_id: employeeId.employee_id,
          },
        },
      },
    });
  }

  const user_id = res.user_id;

  // go over each res.client and call an async function to create a job for each client
  for (const clientId of res.client) {
    await prisma.job.create({
      data: {
        title: lorem.generateWords(5),
        description: lorem.generateWords(10),
        client: {
          connect: {
            client_id: clientId.client_id,
          },
        },
        user: {
          connect: {
            user_id: user_id,
          },
        },
      },
    });
  }
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
