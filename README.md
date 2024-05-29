# Computing for All Career Services

This repository contains the source code for the Computing for All Career Services website, built with Next.js and Prisma ORM, styled with TailwindCSS. This application helps match employers with job seekers in the tech industry.

## Prerequisites

- Node.js >= 18.17.0
- npm
- MSSQL Server

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory of your project and add the following content:

```env
# MSSQL Connection Configuration
MSSQL_USER=SA
MSSQL_PASSWORD=YourComplex!P4ssw0rd
MSSQL_HOST=localhost
MSSQL_PORT=1433
MSSQL_DATABASE=CoreDB

# Connection String for MSSQL (if using libraries that accept connection strings)
MSSQL_CONNECTION_STRING=mssql://SA:YourComplex!P4ssw0rd@localhost:1433/CoreDB
DATABASE_URL="sqlserver://localhost:1433;database=CoreDB;user=SA;password=YourComplex!P4ssw0rd;encrypt=false;trustServerCertificate=true"

AUTH_SECRET=<generate a base64 key with `openssl rand -base64 32` in your terminal>
```

### 4. Set Up the Database

Generate Prisma client and push the schema to your MSSQL database:

```bash
npx prisma generate
npx prisma db push
```

### 5. Seed the Database

To seed the database with initial data, run:

```bash
npm run seed
```

### 6. Run the Development Server

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## Available Scripts

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
