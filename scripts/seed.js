const { images, tags } = require('../app/lib/placeholder-data.js');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
async function main() {
  const user = await prisma.Image.create({
    data: {
      title: 'Alice',
      url: '/123',
      tags: {
        create: [
          {
            tag: {
              create: {
                name: 'blue',
              },
            },
          },
        ],
      },
    },
  });
  console.log(user);
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

// async function seedImages(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     // Insert data into the "images" table
//     const insertedImages = await Promise.all(
//       images.map(async (image) => {
//         return client.sql`
//         INSERT INTO "Image" (title, url)
//         VALUES (${image.title}, ${image.url})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//       }),
//     );

//     console.log(`Seeded ${insertedImages.length} images`);

//     return {
//       images: insertedImages,
//     };
//   } catch (error) {
//     console.error('Error seeding images:', error);
//     throw error;
//   }
// }

// async function seedTags(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     // Insert data into the "images" table
//     const insertedTags = await Promise.all(
//       tags.map(async (tag) => {
//         return client.sql`
//         INSERT INTO "Tag" (name)
//         VALUES (${tag.name})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//       }),
//     );

//     console.log(`Seeded ${insertedTags.length} tags`);

//     return {
//       users: insertedTags,
//     };
//   } catch (error) {
//     console.error('Error seeding tags:', error);
//     throw error;
//   }
// }

// async function seedInvoices(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     // Create the "invoices" table if it doesn't exist
//     const createTable = await client.sql`
//     CREATE TABLE IF NOT EXISTS invoices (
//     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//     customer_id UUID NOT NULL,
//     amount INT NOT NULL,
//     status VARCHAR(255) NOT NULL,
//     date DATE NOT NULL
//   );
// `;

//     console.log(`Created "invoices" table`);

//     // Insert data into the "invoices" table
//     const insertedInvoices = await Promise.all(
//       invoices.map(
//         (invoice) => client.sql`
//         INSERT INTO invoices (customer_id, amount, status, date)
//         VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedInvoices.length} invoices`);

//     return {
//       createTable,
//       invoices: insertedInvoices,
//     };
//   } catch (error) {
//     console.error('Error seeding invoices:', error);
//     throw error;
//   }
// }

// async function seedCustomers(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     // Create the "customers" table if it doesn't exist
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS customers (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email VARCHAR(255) NOT NULL,
//         image_url VARCHAR(255) NOT NULL
//       );
//     `;

//     console.log(`Created "customers" table`);

//     // Insert data into the "customers" table
//     const insertedCustomers = await Promise.all(
//       customers.map(
//         (customer) => client.sql`
//         INSERT INTO customers (id, name, email, image_url)
//         VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedCustomers.length} customers`);

//     return {
//       createTable,
//       customers: insertedCustomers,
//     };
//   } catch (error) {
//     console.error('Error seeding customers:', error);
//     throw error;
//   }
// }

// async function seedRevenue(client) {
//   try {
//     // Create the "revenue" table if it doesn't exist
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS revenue (
//         month VARCHAR(4) NOT NULL UNIQUE,
//         revenue INT NOT NULL
//       );
//     `;

//     console.log(`Created "revenue" table`);

//     // Insert data into the "revenue" table
//     const insertedRevenue = await Promise.all(
//       revenue.map(
//         (rev) => client.sql`
//         INSERT INTO revenue (month, revenue)
//         VALUES (${rev.month}, ${rev.revenue})
//         ON CONFLICT (month) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedRevenue.length} revenue`);

//     return {
//       createTable,
//       revenue: insertedRevenue,
//     };
//   } catch (error) {
//     console.error('Error seeding revenue:', error);
//     throw error;
//   }
// }

// async function main() {
//   const client = await db.connect();

//   await seedImages(client);
//   await seedTags(client);
//   // await seedCustomers(client);
//   // await seedInvoices(client);
//   // await seedRevenue(client);

//   await client.end();
// }

// main().catch((err) => {
//   console.error(
//     'An error occurred while attempting to seed the database:',
//     err,
//   );
// });
