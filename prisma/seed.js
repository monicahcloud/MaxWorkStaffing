// const { PrismaClient } = require("@prisma/client");
// const data = require("./mockData.json");
// const prisma = new PrismaClient();

// async function main() {
//   const clerkId = "user_2vspq0Od7ajkZKOwBMCo6S27s1m";
//   const jobs = data.map((job) => {
//     return {
//       ...job,
//       clerkId,
//     };
//   });
//   for (const job of jobs) {
//     await prisma.job.create({
//       data: job,
//     });
//   }
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
