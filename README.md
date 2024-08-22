# Computing for All - _Tech Talent Showcase_

This repository contains the source code for the Washington Tech Workforce Coalition Tech Talent Showcase website, built with Next.js and Prisma ORM, styled with TailwindCSS. This application helps match employers with jobseekers in the tech industry.

## Reference Designs

- [Jobseeker-UX](https://www.figma.com/design/D8OaFqKB4FSBHTnSHo2rOj/Jobseeker-UX)
- [Employer-Flow--MVP](https://www.figma.com/design/3e9rrmhTrz37hLaEiNmpIZ/Employer-Flow---MVP)

## Prerequisites

- Node.js >= 18.17.0
- npm
- MSSQL Server (optional)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/runefather/frontend-cfa.git
cd your-repo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

If you are creating your own local MSSQL server, please follow our [instructions for setting up MSSQL](setup-MSSQL.md).

Otherwise, if you're just working on the frontend, you can use our shared cloud test MSSQL server! Create a `.env` file in the root directory of your project and copy the below text there. Add your generated Base64 Auth Secret and save!

```env
# MSSQL Connection Configuration
MSSQL_USER=cfa
MSSQL_PASSWORD=superPass123
MSSQL_HOST=cfa-test.database.windows.net
MSSQL_PORT=1433
MSSQL_DATABASE=Test

# Connection String for MSSQL (if using libraries that accept connection strings)
MSSQL_CONNECTION_STRING=mssql://cfa:superPass123@cfa-test.database.windows.net:1433/Test
DATABASE_URL="sqlserver://cfa-test.database.windows.net;database=Test;user=cfa;password=superPass123;encrypt=true;trustServerCertificate=true"

# Generate this secret by running the following command: openssl rand -base64 32
AUTH_SECRET=<your generated base64 auth secret>
```

If there are new changes that need to be applied to the SQL server, you can run the following commands to reset, update, and reseed everything: `npx prisma migrate reset`, then `npm run seed`.

### 4. Run the Development Server

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application in action!

---

## Tutorials and Documentation

- [Set up local MSSQL Server](setup-MSSQL.md)
- [Changing the DB schema](prisma-workflow.md)
- [API Routes](API-routes.md)

## Available `npm run` Scripts

- `build`: Builds the application for production.
- `dev`: Runs the application in development mode.
- `prettier`: Formats the code using Prettier.
- `prettier:check`: Checks if the code is formatted according to Prettier.
- `start`: Starts the application in production mode.
- `seed`: Seeds the database with initial data.
- `lint`: Runs ESLint to check for code issues.

## Technologies Used

- **Next.js**: React framework for server-side rendering. [Next.js Documentation](https://nextjs.org/docs)
- **Prisma**: Database ORM for TypeScript and Node.js. [Prisma Documentation](https://www.prisma.io/docs)
- **TailwindCSS**: Utility-first CSS framework. [TailwindCSS Documentation](https://tailwindcss.com/docs)
- **Auth.js**: Authentication library for Next.js. [Auth.js Documentation](https://authjs.dev/docs)
- **MSSQL**: Microsoft SQL Server database. [MSSQL Documentation](https://docs.microsoft.com/en-us/sql/sql-server)

## License

This project is licensed under the MIT License. See the LICENSE file for details.
