# Computing for All Career Services

This repository contains the source code for the Washington Tech Workforce Coalition Tech Talent Showcase website, built with Next.js and Prisma ORM, styled with TailwindCSS. This application helps match employers with job seekers in the tech industry.

## Prerequisites

- Node.js >= 18.17.0
- npm
- MSSQL Server

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

AUTH_SECRET=<your generated base64 auth secret>
```

### 4. Setting Up MSSQL Server

#### 4.1. Install MSSQL Server

Follow the official [installation guide for SQL Server](https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-ubuntu) to install MSSQL Server on your system.

#### 4.2. Start MSSQL Server

Start the MSSQL Server service:

```bash
sudo systemctl start mssql-server
```

Enable MSSQL Server to start on boot:

```bash
sudo systemctl enable mssql-server
```

#### 4.3. Configure MSSQL Server

Run the setup command and follow the prompts to configure your MSSQL Server:

```bash
sudo /opt/mssql/bin/mssql-conf setup
```

#### 4.4. Install MSSQL Tools

To interact with your MSSQL Server instance, install the MSSQL tools:

```bash
curl -o- https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
sudo curl -o /etc/apt/sources.list.d/mssql-tools.list https://packages.microsoft.com/config/ubuntu/20.04/prod.list
sudo apt-get update
sudo apt-get install mssql-tools unixodbc-dev
```

#### 4.5. Connect to MSSQL Server

Use `sqlcmd` to connect to your MSSQL Server instance:

```bash
sqlcmd -S localhost -U SA -P YourComplex!P4ssw0rd
```

#### 4.6. Create the Database

Once connected, create your database:

```sql
CREATE DATABASE CoreDB;
GO
```

### 5. Set Up the Database

Generate Prisma client and push the schema to your MSSQL database:

```bash
npx prisma generate
npx prisma db push
```

### 6. Seed the Database

To seed the database with initial data, run:

```bash
npm run seed
```

### 7. Run the Development Server

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## Generating a Base64 Auth Secret

Open your terminal and run the following command to generate a base64-encoded secret:

```bash
openssl rand -base64 32
```

Use the generated string as your `AUTH_SECRET` in the `.env` file.

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
