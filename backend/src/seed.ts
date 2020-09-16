import prisma from "./prisma";

async function main() {
  const adminUser = await prisma.admin.create({
    data: {
      password: 'password',
      name: 'Jordon McKoy',
      username: 'jmckoy',
    },
  });

  console.log('admin seeding complete:', adminUser);

  const employee1 = await prisma.employee.create({
    data: {
      name: 'John Doe',
      username: "johndoe",
      password: 'password',
    },
  });

  const employee2 = await prisma.employee.create({
    data: {
      name: 'Jane Smith',
      username: 'janesmith',
      password: 'password',
    },
  });

  console.log('employee seeding complete', employee1, employee2);

  const review1 = await prisma.review.create({
    data: {
      content: "I had a great time working with Jane on the internal project",
      submitted: false,
      employee: {
        connect: {
          id: employee2.id
        }
      },
      reviewer: {
        connect: {
          id: employee1.id
        }
      }
  }});

  console.log('review seeding complete', review1);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
