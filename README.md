# Computing for All - _Tech Talent Showcase_

This repository contains the source code for the Washington Tech Workforce Coalition Tech Talent Showcase website, built
with Next.js and Prisma ORM, styled with TailwindCSS. This application helps match employers with jobseekers in the
tech industry.

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

Follow the
official [installation guide for SQL Server](https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-ubuntu)
to install MSSQL Server on your system.

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
CREATE
DATABASE CoreDB;
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

## 8. Prisma ORM Workflow

#### 8.1. Making changes to the Database with prisma/schema.prisma file

There are two main schema migration patterns. 1) **Model/Entity-first migration** 2) **Database-first migration**. We
are using the **Model/Entity-first migration pattern** with this pattern, you define the structure of the database
schema with code and then use a migration tool to generate the SQL.
Gain further insights in the
Prisma/docs [Mental model](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/mental-model).

> These changes to the db schema are defined in the prisma/schema.prisma file

#### 8.2. After making changes to the schema.prisma file run the following CLI command:

```bash
npx prisma migrate dev --name "<brief-description-of-change>"
```

Running `prisma migrate dev` stores the changes in two separate locations:

1) In code in the prisma/migrations directory. Any migrations should be saved and stored to the repository.
2) In the _prisma_migrations table of the database

This will create a folder in the in prisma/migrations directory containing a migration.sql file. The name of the folder
is prefixed with the timestamp and appended with the name given when running `prisma migrate dev`. The migration.sql
file contains the SQL commands that are applied to the database. See more in the
Prisma/docs [About migration histories](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/migration-histories)

> There are occasions when the migrations do not work correctly and conflicts need resolved. If making changes
> manually to the database it is important to make sure any modifications to the `migration.sql` file are also applied
> to the _prisma_migrations table record in the database and vice versa. Learn more in Prisma
> docs [Customizing Migrations](https://www.prisma.io/docs/orm/prisma-migrate/workflows/customizing-migrations)

#### 8.3. To ensure prisma migrations are applied correctly you can run the following command.

```bash
npx prisma migrate reset
```

This will drop all data from the database and apply all migrations in the prisma/migrations folder. After applying the
migrations the PrismaClient is updated. That is immediately after reset the CLI command `npx prisma generate` is
invoked.

_Note. If the development server is running the PrismaClient will not be updated. Stop the development environment and
run `npx prisma generate` to update the PrismaClient manually._

```bash
npx prisma generate
```

Learn more about the Prisma Client and `npx prisma generate` at
Prisma/docs [Accessing your database with Prisma Client](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma#accessing-your-database-with-prisma-client)

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

---

## API Routes

This section provides detailed information on the available API routes for the Computing for All Talent Finder
application.
---

### Jobseeker Routes

---

#### Jobseeker List View Query

_This route is used to generate the cards on the listview page. On the server side it filters based on skills and years
work experience. Also, it will also filter out any jobseeker accounts that have been marked for deletion._

**Endpoint**: `/api/jobseekers/query`

**Method**: `POST`

##### Sample Request Object

```json
{
  "skills": [],
  "yearsWorkExp": 0
}
```

##### Sample Response Object

```json
[
  {
    "jobseeker_id": "d193e1c1-241b-46f9-ac78-d8076ae357d9",
    "user_id": "84579f62-755f-429b-a141-60b8093b6544",
    "intro_headline": "\n    Hi, my name is Courtney Lebsack. I am a highly skilled Future Accountability Analyst with over 7 years of experience in the industry.\n    I have a proven track record of success at Wehner Inc, where I contributed to numerous high-profile projects.\n    My key skills include auxiliary array, solid state monitor, online sensor.\n  ",
    "pathways": {
      "pathway_id": "01b09b15-428c-4eb8-96de-ae9933f51842",
      "pathway_title": "Cloud Computing"
    },
    "contacts": {
      "user_id": "84579f62-755f-429b-a141-60b8093b6544",
      "role": "Jobseeker",
      "first_name": "Courtney",
      "last_name": "Lebsack",
      "photo_url": "https://randomuser.me/api/portraits/men/55.jpg"
    },
    "jobseeker_education": [],
    "jobseeker_has_skills": [
      {
        "skills": {
          "skill_id": "80b21e5f-1905-4c75-9a3d-e43692845295",
          "skill_name": "Federated Identity Management",
          "skill_info_url": "https://lightcast.io/open-skills/skills/KS123W065B95QJ1G00BL"
        }
      },
      {
        "skills": {
          "skill_id": "bd9722e6-872c-424a-8a90-9b1cef55b0aa",
          "skill_name": "NonStop SQL",
          "skill_info_url": "https://lightcast.io/open-skills/skills/KS1272N6NN3ZKFXYCFL4"
        }
      },
      {
        "skills": {
          "skill_id": "c9e3a4d6-97b1-4d82-a132-fc2f253ddb4b",
          "skill_name": "Internet Transit",
          "skill_info_url": "https://lightcast.io/open-skills/skills/KS125BY6GHQ5SPTKQ7TB"
        }
      },
      {
        "skills": {
          "skill_id": "89c6a12e-b094-4e95-83ae-1e9d58a932a5",
          "skill_name": "BlackBerry OS",
          "skill_info_url": "https://lightcast.io/open-skills/skills/KS1212J609C8JTL1H9W1"
        }
      },
      {
        "skills": {
          "skill_id": "8e59e0b3-a0af-46bf-989e-e86a5d045e44",
          "skill_name": "Cryptographic Protocols",
          "skill_info_url": "https://lightcast.io/open-skills/skills/KS123JD6CYFD6JNW67DX"
        }
      }
    ]
  }
]
```

## Profile Creation APIs

---

### Introduction Page

---

#### Create or Update Introduction Page

_This route is meant to be used with the `profile-creation/jobseeker/intro page` to create or update new entries. It
creates or updates all the data in entire introduction page._

**Endpoint**: `/api/jobseekers/intro-profile-upsert`

**Method**: `POST`

##### Sample Request

**DTO**: `JsIntroPostDTO`

```json
{
  "userId": "ae80e273-2975-4703-a894-f3c1e01428fd",
  "photoUrl": "http://example.com/photo.jpg",
  "firstName": "Gary",
  "lastName": "Larson",
  "birthDate": "2000-01-01T00:00:00.000Z",
  "phoneCountryCode": "1",
  "phone": "(555) 123.4567",
  "zipCode": "98101",
  "state": "WA",
  "city": "Seattle",
  "county": "King",
  "email": "gary@computingforall.org",
  "introHeadline": "Aspiring Software Developer",
  "currentJobTitle": "Junior Developer",
  "resumeUrl": "http://example.com/resume.pdf"
}

```

##### Sample Response

**DTO**: loadIntroPage property uses DTO `JsIntroDTO`

```json
{
  "success": true,
  "result": {
    "loadIntroPage": {
      "userId": "ae80e273-2975-4703-a894-f3c1e01428fd",
      "photoUrl": "http://example.com/photo.jpg",
      "firstName": "Gary",
      "lastName": "Larson",
      "birthDate": "2000-01-01T00:00:00.000Z",
      "phoneCountryCode": "1",
      "phone": "5551234567",
      "zipCode": "98101",
      "state": "WA",
      "city": "Seattle",
      "county": "King",
      "email": "gary@computingforall.org",
      "introHeadline": "Aspiring Software Developer",
      "currentJobTitle": "Junior Developer",
      "resumeUrl": "http://example.com/resume.pdf"
    },
    "meta": {
      "emailVerified": null,
      "createdAt": "2024-07-28T21:04:28.486Z",
      "pathwayId": "0e05761b-f42a-448a-9284-301596146aed",
      "jobseekerId": "48586cd0-74ba-4da0-9bb2-2862a5c7ca5b",
      "contactAddressId": "7954a995-836d-4cc2-9c92-07910a1b8836",
      "isMarkedDeletion": "2024-07-29T18:51:20.993Z"
    }
  }
}
```

---

#### Read Jobseeker Introduction Page

_This route is meant to be used with the `/create-profile/jobseeker/intro` page for initial load if there is preexisting
data._

**Endpoint**: `/api/jobseekers/intro-profile-read`

**Method**: `POST`

##### Sample Request

**DTO**: `none`

```json
{
  "userId": "ae80e273-2975-4703-a894-f3c1e01428fd"
}
```

##### Sample Response

**DTO**: result.loadIntroPage property uses DTO `JsIntroDTO`

```json
{
  "success": true,
  "result": {
    "loadIntroPage": {
      "userId": "ae80e273-2975-4703-a894-f3c1e01428fd",
      "photoUrl": "http://example.com/photo.jpg",
      "firstName": "Gary",
      "lastName": "Larson",
      "birthDate": "2000-01-01T00:00:00.000Z",
      "phoneCountryCode": "+1",
      "phone": "5551234567",
      "zipCode": "98101",
      "state": "WA",
      "city": "Seattle",
      "county": "King",
      "email": "gary@computingforall.org",
      "introHeadline": "Aspiring Software Developer",
      "currentJobTitle": "Junior Developer",
      "resumeUrl": "http://example.com/resume.pdf"
    },
    "meta": {
      "emailVerified": null,
      "createdAt": "2024-07-28T21:04:28.486Z",
      "pathwayId": "0e05761b-f42a-448a-9284-301596146aed",
      "jobseekerId": "48586cd0-74ba-4da0-9bb2-2862a5c7ca5b",
      "contactAddressId": "7954a995-836d-4cc2-9c92-07910a1b8836",
      "isMarkedDeletion": "2024-07-29T18:51:20.993Z"
    }
  }
}
```

---

### Education Page

---

#### Create or Update Jobseeker Education Page

_This route is meant to be used with the `/create-profile/jobseeker/education` page for creating or updating any data on
this page._

If the institution does not currently exist in our database an entry is created in the `edu_institutions` table using
the institutionName property. There should exist a drop-down available for jobseekers to use to choose their educational
institution.

> NOTE: For optimization we may want to implement individual CREATE routes for each of the following: certifications,
> project experiences, work experiences.

**Endpoint**: `/api/jobseekers/edu-profile-upsert`

**Method**: `POST`

##### Sample Request

**DTO**: `JsEducationDTO`

```json
{
  "userId": "ae80e273-2975-4703-a894-f3c1e01428fd",
  "currentEdProgram": "College",
  "highestLevelOfStudy": "Bachelor's Degree",
  "currentGrade": "Junior",
  "isEnrolledEdProgram": true,
  "schools": [
    {
      "jobseekerEdId": "53d66079-60e2-46a2-9214-e86e2f766734",
      "edInstitutionId": "077291f4-a2d6-484c-82bc-ae96ba036761",
      "institutionName": "North Seattle College",
      "edProgram": "College",
      "edSystem": null,
      "isEnrolled": true,
      "startDate": "2024-12-01T00:00:00.000Z",
      "gradDate": "2028-07-01T00:00:00.000Z",
      "degreeType": "BachelorsDegree",
      "major": "Computer Science",
      "minor": "asdf",
      "description": "Studied various computer science topics and applied them in practical projects."
    },
    {
      "jobseekerEdId": "dc9fb674-1e7c-46c3-a3d2-5bc72e5dd4c6",
      "edInstitutionId": "24f31a6d-2c7b-48d2-88ee-cf65edbd5fa0",
      "institutionName": "CFA PAP",
      "edProgram": "PreApprenticeship",
      "edSystem": "System ABC",
      "isEnrolled": false,
      "startDate": "2022-06-01T00:00:00.000Z",
      "gradDate": "2028-06-01T00:00:00.000Z",
      "degreeType": "None",
      "major": null,
      "minor": null,
      "description": "Studied various computer science topics and applied them in practical projects."
    }
  ],
  "certifications": [
    {
      "certId": "5b97ce22-6f37-4ea1-91c4-9f41e513d8e0",
      "name": "Certified JavaScript Developer",
      "logoUrl": "",
      "issuingOrg": "XYZ Institute",
      "credentialId": "CJD-002",
      "credentialUrl": "http://credential.u",
      "issueDate": "2023-01-01T00:00:00.000Z",
      "expiryDate": "2025-01-01T00:00:00.000Z",
      "description": "Certification"
    }
  ],
  "projects": [
    {
      "projectId": "b5a4f51c-90e5-4b6e-9a5a-83f1c8f789c6",
      "jobseekerId": "7e1db701-f79a-43e5-a434-23dd6690fb57",
      "projTitle": "Web Development Project",
      "projectRole": "backend dev",
      "startDate": "2022-01-01T00:00:00.000Z",
      "completionDate": "2022-06-01T00:00:00.000Z",
      "problemSolvedDescription": "Developed a web application using React and Node.js.",
      "teamSize": "8",
      "repoUrl": "https://www.repo.url",
      "demoUrl": "https:///www.demo.url",
      "skills": [
        {
          "skill_id": "356e0040-8400-49a0-b772-6f6475776612",
          "skill_name": "JavaScript",
          "skill_info_url": "https://lightcast.io/open-skills/skills/KS1200771D9CR9LB4MWW/javascript-programming-language"
        },
        {
          "skill_id": "38943cce-679d-408f-9fb1-6d054012e54f",
          "skill_name": ".NET Assemblies",
          "skill_info_url": "https://lightcast.io/open-skills/skills/KS126XS6CQCFGC3NG79X"
        }
      ]
    }
  ]
}
```

##### Sample Response

**DTO**: result property adheres to`JsEducationDTO`

```json
{
  "success": true,
  "result": {
    "userId": "ae80e273-2975-4703-a894-f3c1e01428fd",
    "currentEdProgram": "College",
    "highestLevelOfStudy": "Bachelor's Degree",
    "currentGrade": "Junior",
    "isEnrolledEdProgram": false,
    "schools": [
      {
        "jobseekerEdId": "53d66079-60e2-46a2-9214-e86e2f766734",
        "edInstitutionId": "077291f4-a2d6-484c-82bc-ae96ba036761",
        "edProgram": "College",
        "edSystem": null,
        "isEnrolled": true,
        "startDate": "2024-12-01T00:00:00.000Z",
        "gradDate": "2028-07-01T00:00:00.000Z",
        "degreeType": null,
        "major": "Computer Science",
        "minor": "asdf",
        "description": "Studied various computer science topics and applied them in practical projects."
      },
      {
        "jobseekerEdId": "dc9fb674-1e7c-46c3-a3d2-5bc72e5dd4c6",
        "edInstitutionId": "24f31a6d-2c7b-48d2-88ee-cf65edbd5fa0",
        "edProgram": null,
        "edSystem": "System ABC",
        "isEnrolled": true,
        "startDate": "2022-06-01T00:00:00.000Z",
        "gradDate": "2028-06-01T00:00:00.000Z",
        "degreeType": "None",
        "major": null,
        "minor": null,
        "description": "Studied various computer science topics and applied them in practical projects."
      }
    ],
    "certifications": [
      {
        "certId": "5b97ce22-6f37-4ea1-91c4-9f41e513d8e0",
        "name": "Certified JavaScript Developer",
        "logoUrl": null,
        "issuingOrg": "XYZ Institute",
        "credentialId": "CJD-002",
        "credentialUrl": "http://credential.u",
        "issueDate": "2023-01-01T00:00:00.000Z",
        "expiryDate": "2023-01-01T00:00:00.000Z",
        "description": "Certification"
      }
    ],
    "projects": [
      {
        "projectId": "b5a4f51c-90e5-4b6e-9a5a-83f1c8f789c6",
        "jobseekerId": "7e1db701-f79a-43e5-a434-23dd6690fb57",
        "projTitle": "Web Development Project",
        "projectRole": "backend dev",
        "startDate": "2022-01-01T00:00:00.000Z",
        "completionDate": "2022-06-01T00:00:00.000Z",
        "problemSolvedDescription": "Developed a web application using React and Node.js.",
        "teamSize": "8",
        "repoUrl": "https://www.repo.url",
        "demoUrl": "https:///www.demo.url",
        "skills": [
          {
            "skill_id": "356e0040-8400-49a0-b772-6f6475776612",
            "skill_name": "JavaScript",
            "skill_info_url": "https://lightcast.io/open-skills/skills/KS1200771D9CR9LB4MWW/javascript-programming-language"
          },
          {
            "skill_id": "38943cce-679d-408f-9fb1-6d054012e54f",
            "skill_name": ".NET Assemblies",
            "skill_info_url": "https://lightcast.io/open-skills/skills/KS126XS6CQCFGC3NG79X"
          }
        ]
      }
    ]
  }
}
```

---

#### Read Jobseeker Education Profile Page

_This route is meant to be used with the `/create-profile/jobseeker/education` page for initial loading of preexisting
data, if any._

**Endpoint**: `/api/jobseekers/edu-profile-read`

**Method**: `POST`

##### Sample Request

**DTO**: `none`

```json
{
  "userId": "ae80e273-2975-4703-a894-f3c1e01428fd"
}
```

##### Sample Response

**DTO**: result property adheres to type `JsEducationDTO`

```json
{
  "success": true,
  "result": {
    "userId": "ae80e273-2975-4703-a894-f3c1e01428fd",
    "currentEdProgram": "College",
    "highestLevelOfStudy": "Bachelor's Degree",
    "currentGrade": "Junior",
    "isEnrolledEdProgram": false,
    "schools": [
      {
        "jobseekerEdId": "53d66079-60e2-46a2-9214-e86e2f766734",
        "edInstitutionId": "077291f4-a2d6-484c-82bc-ae96ba036761",
        "institutionName": "North Seattle College",
        "edProgram": "College",
        "edSystem": null,
        "isEnrolled": true,
        "startDate": "2024-12-01T00:00:00.000Z",
        "gradDate": "2028-07-01T00:00:00.000Z",
        "degreeType": null,
        "major": "Computer Science",
        "minor": "asdf",
        "description": "Studied various computer science topics and applied them in practical projects."
      },
      {
        "jobseekerEdId": "dc9fb674-1e7c-46c3-a3d2-5bc72e5dd4c6",
        "edInstitutionId": "24f31a6d-2c7b-48d2-88ee-cf65edbd5fa0",
        "institutionName": "CFA PAP",
        "edProgram": null,
        "edSystem": "System ABC",
        "isEnrolled": true,
        "startDate": "2022-06-01T00:00:00.000Z",
        "gradDate": "2028-06-01T00:00:00.000Z",
        "degreeType": "None",
        "major": null,
        "minor": null,
        "description": "Studied various computer science topics and applied them in practical projects."
      }
    ],
    "certifications": [
      {
        "certId": "5b97ce22-6f37-4ea1-91c4-9f41e513d8e0",
        "name": "Certified JavaScript Developer",
        "logoUrl": null,
        "issuingOrg": "XYZ Institute",
        "credentialId": "CJD-002",
        "credentialUrl": "http://credential.u",
        "issueDate": "2023-01-01T00:00:00.000Z",
        "expiryDate": "2023-01-01T00:00:00.000Z",
        "description": "Certification"
      }
    ],
    "projects": [
      {
        "projectId": "b5a4f51c-90e5-4b6e-9a5a-83f1c8f789c6",
        "projTitle": "Web Development Project",
        "projectRole": "backend dev",
        "startDate": "2022-01-01T00:00:00.000Z",
        "completionDate": "2022-06-01T00:00:00.000Z",
        "problemSolvedDescription": "Developed a web application using React and Node.js.",
        "teamSize": "8",
        "repoUrl": "https://www.repo.url",
        "demoUrl": "https:///www.demo.url",
        "skills": [
          {
            "skill_id": "356e0040-8400-49a0-b772-6f6475776612",
            "skill_name": "JavaScript",
            "skill_info_url": "https://lightcast.io/open-skills/skills/KS1200771D9CR9LB4MWW/javascript-programming-language"
          },
          {
            "skill_id": "38943cce-679d-408f-9fb1-6d054012e54f",
            "skill_name": ".NET Assemblies",
            "skill_info_url": "https://lightcast.io/open-skills/skills/KS126XS6CQCFGC3NG79X"
          }
        ]
      }
    ]
  }
}
```

---

#### Delete Jobseeker Education Record

_This will delete a jobseeker education record. It is intended for use within the `/create-profile/jobseeker/education`
page using the key from the respective jobseeker education entry._

**Endpoint**: `/api/jobseekers/edu-record-delete`

**Method**: `DELETE`

##### Sample Request

**DTO**: `none`

```json
{
  "jobseekerEdId": "53d66079-60e2-46a2-9214-e86e2f766734"
}
```

##### Sample Response

**DTO**: result property is type `jobseekers_education` generated by PrismaClient from schema.prisma

```json
{
  "success": true,
  "result": {
    "jobseekerEdId": "53d66079-60e2-46a2-9214-e86e2f766734",
    "jobseekerId": "48586cd0-74ba-4da0-9bb2-2862a5c7ca5b",
    "edInstitutionId": "077291f4-a2d6-484c-82bc-ae96ba036761",
    "edProgram": "College",
    "edSystem": null,
    "isEnrolled": true,
    "startDate": "2024-12-01T00:00:00.000Z",
    "gradDate": "2028-07-01T00:00:00.000Z",
    "degreeType": "BachelorsDegree",
    "major": "Computer Science",
    "minor": "asdf",
    "description": "Studied various computer science topics and applied them in practical projects."
  }
}
```

---

#### Delete Jobseeker Certification

_This will delete a jobseeker certification record. It is intended for use within
the `/create-profile/jobseeker/education` page using the key from the respective certification entry._

**Endpoint**: `/api/jobseekers/cert-record-delete`

**Method**: `DELETE`

##### Sample Request

**DTO**: `none`

```json
{
  "certId": "5b97ce22-6f37-4ea1-91c4-9f41e513d8e0"
}
```

##### Sample Response

**DTO**: result property is `certificates` type generated by PrismaClient from schema.prisma

```json
{
  "success": true,
  "result": {
    "certId": "5b97ce22-6f37-4ea1-91c4-9f41e513d8e0",
    "jobSeekerId": "48586cd0-74ba-4da0-9bb2-2862a5c7ca5b",
    "name": "Certified JavaScript Developer",
    "logoUrl": null,
    "issuingOrg": "XYZ Institute",
    "credentialId": "CJD-002",
    "credentialUrl": "http://credential.u",
    "issueDate": "2023-01-01T00:00:00.000Z",
    "expiryDate": "2025-01-01T00:00:00.000Z",
    "description": "Certification"
  }
}
```

---

#### Delete Jobseeker Project Experience

_This will delete a jobseeker project experience record. It is intended for use within
the `/create-profile/jobseeker/education` page using the key from the respective project experience entry. It will also
delete the associated skills from within the `project_has_skills` table._

**Endpoint**: `/api/jobseekers/proj-record-delete`

**Method**: `DELETE`

##### Sample Request

**DTO**: `none`

```json
{
  "projectId": "b5a4f51c-90e5-4b6e-9a5a-83f1c8f789c6"
}
```

##### Sample Response

**DTO**: result property is `ProjectExperiences` type generated by PrismaClient from schema.prisma

```json
{
  "success": true,
  "result": {
    "deletedEntry": {
      "projectId": "b5a4f51c-90e5-4b6e-9a5a-83f1c8f789c6",
      "jobseekerId": "48586cd0-74ba-4da0-9bb2-2862a5c7ca5b",
      "projTitle": "Web Development Project",
      "projectRole": "backend dev",
      "startDate": "2022-01-01T00:00:00.000Z",
      "completionDate": "2022-06-01T00:00:00.000Z",
      "problemSolvedDescription": "Developed a web application using React and Node.js.",
      "teamSize": 8,
      "repoUrl": "https://www.repo.url",
      "demoUrl": "https:///www.demo.url"
    },
    "skills": {
      "count": 2
    }
  }
}
```

---

### Work Experience Page

---

#### Create or Update Jobseeker Work Profile Page

_This route is meant to be used with the `/create-profile/jobseeker/work-experience` page for creating or updating
data._

**Endpoint**: `/api/jobseekers/work-profile-upsert`

**Method**: `POST`

##### Sample Request

> Currently, "techAreaId" is not available from the frontend. It is hardcoded into the seed.mjs file for this to work.
> Work experiences should contain a drop-down to determine the tech area for the work experience.

**DTO**: `JsWorkExpDTO`

```json
{
  "userId": "ae80e273-2975-4703-a894-f3c1e01428fd",
  "yearsWorkExperience": "5",
  "amountInternshipExperience": "2",
  "isAuthorizedToWorkUsa": true,
  "requiresSponsorship": false,
  "workExperiences": [
    {
      "workId": "ddf90dca-5273-4651-aef3-340ea8494335",
      "company": "CFA",
      "jobTitle": "Backend Web Developer",
      "isCurrentJob": true,
      "startDate": "2020-01-01",
      "endDate": null,
      "responsibilities": "Coordinating and developing Project Factory projects",
      "isInternship": false,
      "techAreaId": "7acd2248-a2c3-4789-b414-a2463b75997a"
    },
    {
      "workId": "ddf90cad-5273-4651-aef3-340ea8494335",
      "company": "CFA",
      "jobTitle": "intern",
      "isCurrentJob": false,
      "startDate": "2022-01-01",
      "endDate": "2022-03-25",
      "responsibilities": "Microsoft Dynamics Plugins for admin workflow",
      "isInternship": true,
      "techAreaId": "4c376b09-38e2-4278-b70b-975837c43fe5"
    }
  ]
}

```

##### Sample Response

**DTO**: result property is `JsWorkExpDTO` type.

```json
{
  "success": true,
  "result": {
    "userId": "ae80e273-2975-4703-a894-f3c1e01428fd",
    "yearsWorkExperience": "5",
    "monthsInternshipExperience": "2",
    "isAuthorizedToWorkUsa": true,
    "requiresSponsorship": false,
    "workExperiences": [
      {
        "workId": "ddf90dca-5273-4651-aef3-340ea8494335",
        "jobseekerId": "48586cd0-74ba-4da0-9bb2-2862a5c7ca5b",
        "techAreaId": "7acd2248-a2c3-4789-b414-a2463b75997a",
        "company": "CFA",
        "isInternship": false,
        "jobTitle": "Backend Web Developer",
        "isCurrentJob": true,
        "startDate": "2020-01-01T00:00:00.000Z",
        "endDate": null,
        "responsibilities": "Coordinating and developing Project Factory projects"
      },
      {
        "workId": "ddf90cad-5273-4651-aef3-340ea8494335",
        "jobseekerId": "48586cd0-74ba-4da0-9bb2-2862a5c7ca5b",
        "techAreaId": "4c376b09-38e2-4278-b70b-975837c43fe5",
        "company": "CFA",
        "isInternship": true,
        "jobTitle": "intern",
        "isCurrentJob": false,
        "startDate": "2022-01-01T00:00:00.000Z",
        "endDate": "2022-03-25T00:00:00.000Z",
        "responsibilities": "Microsoft Dynamics Plugins for admin workflow"
      }
    ]
  }
}
```

---

#### Read Jobseeker Work Experience Profile Page

_This route is meant to be used with the `/create-profile/jobseeker/work-experience` page for initial load of data, if
any._

**Endpoint**: `/api/jobseekers/work-profile-read`

**Method**: `POST`

##### Sample Request

**DTO**: `none`

```json
{
  "userId": "ae80e273-2975-4703-a894-f3c1e01428fd"
}
```

##### Sample Response

**DTO**: Result property is type `JsWorkExpDTO`

```json
{
  "success": true,
  "result": {
    "userId": "ae80e273-2975-4703-a894-f3c1e01428fd",
    "yearsWorkExperience": "5",
    "monthsInternshipExperience": "2",
    "isAuthorizedToWorkUsa": true,
    "requiresSponsorship": false,
    "workExperiences": [
      {
        "workId": "ddf90dca-5273-4651-aef3-340ea8494335",
        "jobseekerId": "a7e2b588-201a-4b2c-a35c-495ede76f840",
        "company": "CFA",
        "jobTitle": "Backend Web Developer",
        "isCurrentJob": true,
        "startDate": "2020-01-01T00:00:00.000Z",
        "endDate": null,
        "responsibilities": "Coordinating and developing Project Factory projects",
        "isInternship": false,
        "techAreaId": "7acd2248-a2c3-4789-b414-a2463b75997a"
      },
      {
        "workId": "ddf90cad-5273-4651-aef3-340ea8494335",
        "jobseekerId": "a7e2b588-201a-4b2c-a35c-495ede76f840",
        "company": "CFA",
        "jobTitle": "intern",
        "isCurrentJob": false,
        "startDate": "2022-01-01T00:00:00.000Z",
        "endDate": "2022-03-25T00:00:00.000Z",
        "responsibilities": "Microsoft Dynamics Plugins for admin workflow",
        "isInternship": true,
        "techAreaId": "4c376b09-38e2-4278-b70b-975837c43fe5"
      }
    ]
  }
}
```

---

#### Delete Jobseeker Work Experience

_This route is intended for use by a jobseeker to delete a Work Experience from their profile_

**Endpoint**: `/api/jobseekers/work-record-delete`

**Method**: `DELETE`

##### Sample Request

**DTO**: `none`

```json
{
  "workId": "ddf90cad-5273-4651-aef3-340ea8494335"
}
```

##### Sample Response

**DTO**: result property is `WorkExperience` type generated by PrismaClient from schema.prisma

```json
{
  "success": true,
  "result": {
    "workId": "ddf90cad-5273-4651-aef3-340ea8494335",
    "jobseekerId": "48586cd0-74ba-4da0-9bb2-2862a5c7ca5b",
    "techAreaId": "4c376b09-38e2-4278-b70b-975837c43fe5",
    "company": "CFA",
    "isInternship": true,
    "jobTitle": "intern",
    "isCurrentJob": false,
    "startDate": "2022-01-01T00:00:00.000Z",
    "endDate": "2022-03-25T00:00:00.000Z",
    "responsibilities": "Microsoft Dynamics Plugins for admin workflow"
  }
}
```

---

### Showcase Page

---

#### Read Showcase page

_This route is meant to be used with the `/create-profile/jobseeker/showcase` page for initial load of data, if any._

**Endpoint**: `/api/jobseekers/showcase-profile-read`

**Method**: `POST`

##### Sample Request

**DTO**: `none`

```json
{
  "userId": "ae80e273-2975-4703-a894-f3c1e01428fd"
}
```

##### Sample Response

**DTO**: result property is type `JsShowcaseDTO`.

```json
{
  "success": true,
  "result": {
    "userId": "71099f10-054e-4027-9237-ef2da5b071ff",
    "skills": [
      {
        "skill_id": "2e560cd6-2560-4aca-b47b-aeebafc0bdd7",
        "skill_name": "Samba (Software)",
        "skill_info_url": "https://lightcast.io/open-skills/skills/KS4407R6K7SXDL4JTSW9"
      },
      {
        "skill_id": "48925f92-982a-45f4-8183-613fb3c257ab",
        "skill_name": "Variable-Length Subnet Masking (VLSM)",
        "skill_info_url": "https://lightcast.io/open-skills/skills/KS441WD6BX1NJ03KKWT1"
      },
      {
        "skill_id": "67e0630b-0806-4d26-a2f1-87ff57d77368",
        "skill_name": "Artificial Intelligence Markup Language (AIML)",
        "skill_info_url": "https://lightcast.io/open-skills/skills/KS120C16DHL5K6SSZX7F"
      },
      {
        "skill_id": "8480e593-d0d3-4bbe-8a5f-104221485ec7",
        "skill_name": "Spring AOP",
        "skill_info_url": "https://lightcast.io/open-skills/skills/ESD850EECFAA1B3058FD"
      },
      {
        "skill_id": "9abeb859-9e74-4378-8cfa-5fb870b912c1",
        "skill_name": "Vim (Text Editor)",
        "skill_info_url": "https://lightcast.io/open-skills/skills/KS124K86RDS814LF5MC9"
      }
    ],
    "portfolioUrl": "https://lost-clone.biz/",
    "portfolioPassword": null,
    "video_url": "https://blaring-existence.info/"
  }
}
```

---

#### Upsert Showcase Page

_This route is meant to be used with the `/create-profile/jobseeker/showcase` page for updating or creating data._

**Endpoint**: `/api/jobseekers/showcase-profile-upsert`

**Method**: `POST`

##### Sample Request

**DTO**: `JsShowcaseDTO`

```json
{
  "userId": "ae80e273-2975-4703-a894-f3c1e01428fd",
  "portfolioUrl": "https://lost-clone.biz/",
  "portfolioPassword": "drowssap",
  "video_url": "https://my-video.url",
  "skills": [
    {
      "skill_id": "356e0040-8400-49a0-b772-6f6475776612",
      "skill_name": "JavaScript",
      "skill_info_url": "https://lightcast.io/open-skills/skills/KS1200771D9CR9LB4MWW/javascript-programming-language"
    },
    {
      "skill_id": "38943cce-679d-408f-9fb1-6d054012e54f",
      "skill_name": ".NET Assemblies",
      "skill_info_url": "https://lightcast.io/open-skills/skills/KS126XS6CQCFGC3NG79X"
    }
  ]
}
```

##### Sample Response

**DTO**: result property is type `JsShowcaseDTO`.

```json
{
  "success": true,
  "result": {
    "userId": "ae80e273-2975-4703-a894-f3c1e01428fd",
    "portfolioUrl": "https://lost-clone.biz/",
    "portfolioPassword": "drowssap",
    "video_url": "https://my-video.url",
    "skills": [
      {
        "skill_id": "356e0040-8400-49a0-b772-6f6475776612",
        "skill_name": "JavaScript",
        "skill_info_url": "https://lightcast.io/open-skills/skills/KS1200771D9CR9LB4MWW/javascript-programming-language"
      },
      {
        "skill_id": "38943cce-679d-408f-9fb1-6d054012e54f",
        "skill_name": ".NET Assemblies",
        "skill_info_url": "https://lightcast.io/open-skills/skills/KS126XS6CQCFGC3NG79X"
      }
    ]
  }
}
```

---

#### Read Skills

_Intended for use where showing project skills in addition to the top 5 skills is desired. Any duplicate skills between
topSkills and OtherSkills are removed from the OtherSkills Array._

**Endpoint**: `/api/jobseekers/skill-read`

**Method**: `POST`

##### Sample Request

**DTO**: `none`

```json
{
  "userId": "0629cbe6-55b5-486e-84c6-530aa8d5c737"
}
```

##### Sample Response

**DTO**: result property is of type `{topSkills: SkillDTO[], otherSkills: SkillDTO[]}`.

```json
{
  "success": true,
  "result": {
    "topSkills": [
      {
        "skill_id": "0e52f663-173f-4eea-acb6-8485155a1d98",
        "skill_name": "Desktop Management Interface",
        "skill_info_url": "https://lightcast.io/open-skills/skills/KS7G2PN5YHRMM2XMFK68"
      },
      {
        "skill_id": "49172554-720b-4860-88e8-5532dd04c27d",
        "skill_name": "Markup Languages",
        "skill_info_url": "https://lightcast.io/open-skills/skills/KS1233M6Q271L5ZNBP86"
      }
    ],
    "otherSkills": [
      {
        "skill_id": "0141892a-3b07-403c-9763-0c5cefc36bae",
        "skill_name": "Active Directory",
        "skill_info_url": "https://lightcast.io/open-skills/skills/KS1205G5ZKS8ZZWVPM9Y"
      },
      {
        "skill_id": "6eda964a-a65d-4544-abe1-6382cd3ea8fe",
        "skill_name": "Geoprocessing",
        "skill_info_url": "https://lightcast.io/open-skills/skills/KS124B66RYT8PC9B4WPQ"
      }
    ]
  }
}
```

---

#### Upsert Jobseeker Skills

_Used to push jobseeker selected skills into the database_

**Endpoint**: `/api/jobseekers/skill-upsert`

**Method**: `POST`

##### Sample Request

**DTO**: `none`

```json
{
  "userId": "ae80e273-2975-4703-a894-f3c1e01428fd",
  "skillIds": [
    "356e0040-8400-49a0-b772-6f6475776612",
    "38943cce-679d-408f-9fb1-6d054012e54f"
  ]
}
```

##### Sample Response

**DTO**: Result is property type `SKillDTO[]`

```json
{
  "success": true,
  "result": [
    {
      "skill_id": "356e0040-8400-49a0-b772-6f6475776612",
      "skill_name": "JavaScript",
      "skill_info_url": "https://lightcast.io/open-skills/skills/KS1200771D9CR9LB4MWW/javascript-programming-language"
    },
    {
      "skill_id": "38943cce-679d-408f-9fb1-6d054012e54f",
      "skill_name": ".NET Assemblies",
      "skill_info_url": "https://lightcast.io/open-skills/skills/KS126XS6CQCFGC3NG79X"
    }
  ]
}
```

---

#### Delete Jobseeker Skill

_This route is intended for use with the `/create-profile/jobseeker/showcase` page. It can be used anywhere skills
needs unassociated with a jobseeker._

**Endpoint**: `/api/jobseekers/skill-delete`

**Method**: `DELETE`

##### Sample Request

**DTO**: `none`

```json
{
  "userId": "ae80e273-2975-4703-a894-f3c1e01428fd",
  "skillIds": [
    "356e0040-8400-49a0-b772-6f6475776612",
    "38943cce-679d-408f-9fb1-6d054012e54f"
  ]
}
```

##### Sample Response

**DTO**: result is property type `SKillDTO[]`

```json
{
  "success": true,
  "result": [
    {
      "skill_id": "356e0040-8400-49a0-b772-6f6475776612",
      "skill_name": "JavaScript",
      "skill_info_url": "https://lightcast.io/open-skills/skills/KS1200771D9CR9LB4MWW/javascript-programming-language"
    },
    {
      "skill_id": "38943cce-679d-408f-9fb1-6d054012e54f",
      "skill_name": ".NET Assemblies",
      "skill_info_url": "https://lightcast.io/open-skills/skills/KS126XS6CQCFGC3NG79X"
    }
  ]
}
```

---

#### Jobseeker Video Delete

_This route is meant to be used with the `/create-profile/jobseeker/showcase` page. It will set the jobseekers.video_url
property to null and mark it for
deletion in blob storage._

> Blob storage isn't available yet. Plan on implementing as soon as we have access.

**Endpoint**: `/api/jobseekers/video-delete`

**Method**: `POST`

##### Sample Request

**DTO**: `none`

```json
{
  "userId": "ae80e273-2975-4703-a894-f3c1e01428fd"
}
```

##### Sample Response

**DTO**: `{jobseekerId: string, videoUrl?: string | null}`

```json
{
  "success": true,
  "result": {
    "jobseekerId": "8d1026fa-b723-4b55-95d3-7d8a7f40d9b0",
    "videoUrl": null
  }
}
```

---

### Preferences Page

---

#### Read Preferences

_This route is intended to load the `/create-profile/jobseeker/preferences` page with preexisting data, if any_

**Endpoint**: `/api/jobseekers/prefs-profile-read`

**Method**: `POST`

##### Sample Request

**DTO**: `none`

```json
{
  "userId": "ae80e273-2975-4703-a894-f3c1e01428fd"
}
```

##### Sample Response

**DTO**: result property is of type `JsPreferencesDTO & {targetedPathway?: string | null}`

```json
{
  "success": true,
  "result": {
    "userId": "ae80e273-2975-4703-a894-f3c1e01428fd",
    "targetedPathwayId": "79608104-d50e-4d0f-b541-2a9de7bc0f89",
    "targetedPathway": "Software Development",
    "preferredEmploymentType": "Full-time"
  }
}
```

---

#### Upsert Jobseeker Preferences

_This is intended for use updating or creating Jobseeker preferences on the `/create-profile/jobseeker/preferences`
page_

**Endpoint**: `/api/jobseekers/prefs-profile-upsert`

**Method**: `POST`

##### Sample Request

**DTO**: `JsPreferencesDTO`

```json
{
  "userId": "ae80e273-2975-4703-a894-f3c1e01428fd",
  "targetedPathwayId": "79608104-d50e-4d0f-b541-2a9de7bc0f89",
  "preferredEmploymentType": "Full-time"
}
```

##### Sample Response

**DTO**: result property is of type `JsPreferencesDTO & {targetedPathway?: string | null}`

```json
{
  "success": true,
  "result": {
    "userId": "ae80e273-2975-4703-a894-f3c1e01428fd",
    "targetedPathwayId": "79608104-d50e-4d0f-b541-2a9de7bc0f89",
    "targetedPathway": "Software Development",
    "preferredEmploymentType": "Full-time"
  }
}
```

---

### Voluntary Disclosures Page

---

#### Read Jobseeker Disclosures

_Intended to load Jobseeker disclosures data in `/create-profile/jobseeker/disclosures` page, if any._

**Endpoint**: `/api/jobseekers/disclosures-profile-read`

**Method**: `POST`

##### Sample Request

**DTO**: `none`

```json
{
  "userId": "ae80e273-2975-4703-a894-f3c1e01428fd"
}
```

##### Sample Response

**DTO**: `JsDisclosuresDTO`

```json
{
  "success": true,
  "result": {
    "jobseekerId": "96682e87-4940-411f-a09c-be7d45d118c8",
    "gender": "male",
    "race": "caucasian",
    "hasReadTerms": true,
    "isVeteran": "No",
    "hasDisability": "Prefer not to say"
  }
}
```

---

#### Upsert Disclosures

_Intended to be used with the `/create-profile/jobseeker/disclosures` page to update or create disclosure data._

**Endpoint**: `/api/jobseekers/disclosures-profile-upsert`

**Method**: `POST`

##### Sample Request

**DTO**: `JsDisclosuresPOSTDTO`

```json
{
  "userId": "ae80e273-2975-4703-a894-f3c1e01428fd",
  "gender": "male",
  "race": "caucasian",
  "hasReadTerms": true,
  "isVeteran": "No",
  "hasDisability": "Prefer not to say"
}
```

##### Sample Response

**DTO**: `JsDisclosuresDTO`

```json
{
  "success": true,
  "result": {
    "jobseekerId": "96682e87-4940-411f-a09c-be7d45d118c8",
    "gender": "male",
    "race": "caucasian",
    "hasReadTerms": true,
    "isVeteran": "No",
    "hasDisability": "Prefer not to say"
  }
}
```

---

### Employer Routes

---

### Employer Account Creation

---

#### Upsert Employer Personal Information Page

_This route is used to upsert information from the employer account creation personal information page._

**Endpoint**: `api/employers/account/personal-info/upsert`

**Method**: `POST`

##### Sample Request

**DTO**: `PostEmployerPersonalDTO`

```json
{
  "userId": "ae80e273-2975-4703-a894-f3c1e01428fd",
  "firstName": "Inita",
  "lastName": "Talent",
  "birthDate": "1990-12-08",
  "email": "inita@employer.com",
  "gender": "female",
  "race": "asian",
  "photoUrl": "https://blobName.myphoto-123.png"
}
```

##### Sample Response

**DTO**: result property is type `ReadEmployerPersonalDTO`

```json
{
  "success": true,
  "result": {
    "firstName": "Inita",
    "lastName": "Talent",
    "birthDate": "1990-12-08T00:00:00.000Z",
    "email": "inita@employer.com",
    "phone": null,
    "gender": "female",
    "race": "asian",
    "photoUrl": "https://blobName.myphoto-123.png"
  }
}
```

---

#### Read Employer Personal Information Page

_This route is used for the initial load of data for Account Page: Employer Personal Information._

**Endpoint**: `/api/employers/account/personal-info/<userId>`

**Method**: `GET`

##### Sample Response

**DTO**: result property is type `ReadEmployerPersonalDTO`

```json
{
  "success": true,
  "result": {
    "firstName": "Inita",
    "lastName": "Talent",
    "birthDate": "1990-12-08T00:00:00.000Z",
    "email": "inita@employer.com",
    "phone": null,
    "gender": "female",
    "race": "asian",
    "photoUrl": "https://blobName.myphoto-123.png"
  }
}
```

---

#### Upsert Employer Professional Information Page

_This route is used for the initial load of data for Account Page: Employer Professional Information. There needs to be
a drop-down for an employer to select companies' address_

**Endpoint**: `/api/employers/account/professional-info/upsert`

**Method**: `POST`

##### Sample Request

**DTO**: `PostEmployerWorkDTO`

```json
{
  "userId": "ae80e273-2975-4703-a894-f3c1e01428fd",
  "currentJobTitle": "Full-stack Developer",
  "linkedInUrl": "https://www.linkedin.com/in/theEmployer/",
  "workAddressId": "8c08d31f-9e1f-4172-b195-66e528e39fd6"
}
```

##### Sample Response

**DTO**: result property is type `ReadEmployerWorkDTO & CompanyInfoSummaryDTO`

```json
{
  "success": true,
  "result": {
    "employerId": "d651f281-8bdd-4ff6-87ee-fad3727aade2",
    "currentJobTitle": "Full-stack Developer",
    "linkedInUrl": "https://www.linkedin.com/in/theEmployer/",
    "companyId": "b9e1769b-3d02-46ec-8e56-77788916dadb",
    "companyName": "Gulgowski - Mohr",
    "isVerifiedEmployee": false,
    "companyAddress": {
      "city": "Thousand Oaks",
      "state": "Washington",
      "zipCode": "98092"
    }
  }
}
```

---

#### Read Employer Professional Information Page

_This route is used for the initial load of data for Account Page: Employer Professional Information._

**Endpoint**: `api/employers/account/professional-info/<userId>`

**Method**: `GET`


##### Sample Response
**DTO**: ``
```json
{
    "success": true,
    "result": {
        "employerId": "d651f281-8bdd-4ff6-87ee-fad3727aade2",
        "currentJobTitle": "Full-stack Developer",
        "linkedInUrl": "https://www.linkedin.com/in/theEmployer/",
        "companyId": "b9e1769b-3d02-46ec-8e56-77788916dadb",
        "companyName": "Gulgowski - Mohr",
        "isVerifiedEmployee": false,
        "companyAddress": {}
    }
}
```

---

#### Upsert Employer Company Information Page

_This route is used for upserting employer data for Account Page: Employer Company Information._

**Endpoint**: `/api/employers/account/company-info/upsert`

**Method**: `POST`

##### Sample Request
**DTO**: `PostCompanyInfoDTO`
```json
{
    "userId": "ae80e273-2975-4703-a894-f3c1e01428fd",
    "companyId": "b9e1769b-3d02-46ec-8e56-77788916dadb",
    "industrySectorId": "ad7ab06d-d4bb-4ec4-beb3-1ee4d71c0586",
    "companyName": "Gulgowski - Mohr",
    "companyAddresses": [
        {
            "city": "Thousand Oaks",
            "state": "Washington",
            "zipCode": "98092",
            "county": "Pierce"
        }
    ],
    "logoUrl": "https://monthly-sentence.org",
    "aboutUs": "Adstringo triumphus vado dapifer verumtamen sumptus uberrime volva suasoria socius. Tantum vulariter socius vetus sto socius.",
    "companyEmail": "Sophie.McClure65@yahoo.com",
    "yearFounded": "1995",
    "websiteUrl": "https://even-policy.biz/",
    "videoUrl": "https://stylish-pursuit.com",
    "companyPhone": "+323762322141",
    "mission": "Hire everyone!",
    "vision": "Amita clarus tumultus theca adimpleo amoveo amet statim adipisci. Amita concedo viscus tener dicta auditor desino deduco sonitus. Cinis blandior velum agnitio.",
    "employeeCount": "249",
    "estimatedAnnualHires": "10"
}
```

##### Sample Response
**DTO**: result property is of type `ReadCompanyInfoDTO`
```json
{
    "success": true,
    "result": {
        "companyId": "b9e1769b-3d02-46ec-8e56-77788916dadb",
        "industrySectorId": "ad7ab06d-d4bb-4ec4-beb3-1ee4d71c0586",
        "industrySectorTitle": "Insurance",
        "companyName": "Gulgowski - Mohr",
        "companyAddresses": [
            {
                "addressId": "c633d591-8312-44ad-85d1-7bd6f97d0cc5",
                "state": "WA",
                "city": "Clarksville",
                "zipCode": "99347",
                "county": "Garfield"
            },
            {
                "addressId": "8c08d31f-9e1f-4172-b195-66e528e39fd6",
                "state": "Washington",
                "city": "Thousand Oaks",
                "zipCode": "98092",
                "county": "Pierce"
            }
        ],
        "logoUrl": "https://monthly-sentence.org",
        "aboutUs": "Adstringo triumphus vado dapifer verumtamen sumptus uberrime volva suasoria socius. Tantum vulariter socius vetus sto socius.",
        "companyEmail": "Sophie.McClure65@yahoo.com",
        "yearFounded": "1995",
        "websiteUrl": "https://even-policy.biz/",
        "videoUrl": "https://stylish-pursuit.com",
        "companyPhone": "+323762322141",
        "mission": "Hire everyone!",
        "vision": "Amita clarus tumultus theca adimpleo amoveo amet statim adipisci. Amita concedo viscus tener dicta auditor desino deduco sonitus. Cinis blandior velum agnitio.",
        "employeeCount": "249",
        "estimatedAnnualHires": "10",
        "isApproved": false
    }
}
```

---

#### Get Company Addresses By Id

_This is used to get the locations for a specific company_

**Endpoint**: `/api/employers/companies/locations/<companyId>`

**Method**: `GET`

##### Sample Response
**DTO**: result property is of type `ReadAddressDTO[]`
```json
{
    "success": true,
    "result": [
        {
            "addressId": "c633d591-8312-44ad-85d1-7bd6f97d0cc5",
            "city": "Clarksville",
            "state": "WA",
            "zipCode": "99347",
            "county": "Garfield"
        },
        {
            "addressId": "8c08d31f-9e1f-4172-b195-66e528e39fd6",
            "city": "Thousand Oaks",
            "state": "Washington",
            "zipCode": "98092",
            "county": "Pierce"
        }
    ]
}
```

---

#### Read Employer Company Information Page

_This route is used for the initial load of data for Account Page: Employer Company Information._

**Endpoint**: `/api/employers/account/company-info/<companyId>`

**Method**: `GET`

##### Sample Response
**DTO**: result property is of type `ReadCompanyInfoDTO`
```json
{
    "success": true,
    "result": {
        "companyId": "b9e1769b-3d02-46ec-8e56-77788916dadb",
        "industrySectorId": "ad7ab06d-d4bb-4ec4-beb3-1ee4d71c0586",
        "industrySectorTitle": "Insurance",
        "companyName": "Gulgowski - Mohr",
        "companyAddresses": [
            {
                "addressId": "c633d591-8312-44ad-85d1-7bd6f97d0cc5",
                "state": "WA",
                "city": "Clarksville",
                "zipCode": "99347",
                "county": "Garfield"
            },
            {
                "addressId": "8c08d31f-9e1f-4172-b195-66e528e39fd6",
                "state": "Washington",
                "city": "Thousand Oaks",
                "zipCode": "98092",
                "county": "Pierce"
            }
        ],
        "logoUrl": "https://monthly-sentence.org",
        "aboutUs": "Adstringo triumphus vado dapifer verumtamen sumptus uberrime volva suasoria socius. Tantum vulariter socius vetus sto socius.",
        "companyEmail": "Sophie.McClure65@yahoo.com",
        "yearFounded": "1995",
        "websiteUrl": "https://even-policy.biz/",
        "videoUrl": "https://stylish-pursuit.com",
        "companyPhone": "+323762322141",
        "mission": "Hire everyone!",
        "vision": "Amita clarus tumultus theca adimpleo amoveo amet statim adipisci. Amita concedo viscus tener dicta auditor desino deduco sonitus. Cinis blandior velum agnitio.",
        "employeeCount": "249",
        "estimatedAnnualHires": "10",
        "isApproved": false
    }
}
```

---

#### Get Company Addresses By ID

_This route is intended to retrieve the different locations of a specific company._

**Endpoint**: `/api/employers/companies/locations/<companyId>`

**Method**: `GET`

##### Sample Response
**DTO**: result property is of type `ReadCompanyInfoDTO`
```json
{
    "success": true,
    "result": {
        "companyId": "00b5c928-e865-433f-bd6c-10236e46846d",
        "industrySectorId": "868241c7-75c2-47a0-ab0b-1ea9bb74ce2b",
        "industrySectorTitle": "Insurance",
        "companyName": "Gulgowski - Mohr",
        "companyAddresses": [
            {
                "addressId": "a204630e-5849-423e-b030-aaaa11a43210",
                "state": "WA",
                "city": "North Zellaboro",
                "zipCode": "98524",
                "county": "Mason"
            },
            {
                "addressId": "d12383f7-0526-4682-8b32-016654bac9ed",
                "state": "Washington",
                "city": "Thousand Oaks",
                "zipCode": "98092",
                "county": "Pierce"
            }
        ],
        "logoUrl": "https://monthly-sentence.org",
        "aboutUs": "Adstringo triumphus vado dapifer verumtamen sumptus uberrime volva suasoria socius. Tantum vulariter socius vetus sto socius.",
        "companyEmail": "Sophie.McClure65@yahoo.com",
        "yearFounded": "1995",
        "websiteUrl": "https://even-policy.biz/",
        "videoUrl": "https://stylish-pursuit.com",
        "companyPhone": "+323762322141",
        "mission": "Hire everyone!",
        "vision": "Amita clarus tumultus theca adimpleo amoveo amet statim adipisci. Amita concedo viscus tener dicta auditor desino deduco sonitus. Cinis blandior velum agnitio.",
        "employeeCount": "249",
        "estimatedAnnualHires": "10",
        "isApproved": false
    }
}
```

---

#### Update Employer Work Address

_This is intended for an employer to choose their work location for companies that have more than one location_

**Endpoint**: `/api/employers/account/work-address/update`

**Method**: `POST`

##### Sample Request
**DTO**: ``
```json
{
    "userId": "ae80e273-2975-4703-a894-f3c1e01428fd",
    "companyAddressId": "d12383f7-0526-4682-8b32-016654bac9ed"
}
```

##### Sample Response
**DTO**: ``
```json
{
    "success": true,
    "result": {
        "employerId": "2babec5f-3bd0-4356-9d82-34f13874e577",
        "currentJobTitle": "Full-stack Developer",
        "linkedInUrl": "https://www.linkedin.com/in/theEmployer/",
        "companyId": "00b5c928-e865-433f-bd6c-10236e46846d",
        "companyName": "Gulgowski - Mohr",
        "isVerifiedEmployee": false,
        "companyAddress": {
            "addressId": "d12383f7-0526-4682-8b32-016654bac9ed",
            "city": "Thousand Oaks",
            "state": "Washington",
            "zipCode": "98092"
        }
    }
}
```

---

## Technologies Used

- **Next.js**: React framework for server-side rendering. [Next.js Documentation](https://nextjs.org/docs)
- **Prisma**: Database ORM for TypeScript and Node.js. [Prisma Documentation](https://www.prisma.io/docs)
- **TailwindCSS**: Utility-first CSS framework. [TailwindCSS Documentation](https://tailwindcss.com/docs)
- **Auth.js**: Authentication library for Next.js. [Auth.js Documentation](https://authjs.dev/docs)
- **MSSQL**: Microsoft SQL Server database. [MSSQL Documentation](https://docs.microsoft.com/en-us/sql/sql-server)

## License

This project is licensed under the MIT License. See the LICENSE file for details.
