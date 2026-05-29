// import 'dotenv/config';
// import { defineConfig } from 'prisma/config'; 

// console.log('DATABASE_URL from env:', process.env.DATABASE_URL);

// export default defineConfig({
//   datasource: {
//     url: process.env.DATABASE_URL!,
//   },
//   schema: './prisma/schema.prisma',
// });


require('dotenv').config();

module.exports = {
  schema: './prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  },
};
