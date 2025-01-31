export const occupations = [
  {
    title: "Cybersecurity",
    href: "cybersecurity",
    items: [
      {
        href: "/occupation/information-security-analysts",
        name: "Information Security Analysts",
      },
    ],
  },
  {
    title: "Networking",
    href: "networking",
    items: [
      {
        href: "/occupation/network-and-computer-systems-administrators",
        name: "Network and Computer Systems Administrators",
      },
      {
        href: "/occupation/electrical-engineers",
        name: "Electrical Engineers",
      },
      {
        href: "/occupation/computer-systems-analysts",
        name: "Computer Systems Analysts",
      },
    ],
  },
  {
    title: "Data Management & Data Analytics",
    href: "data-management-and-data-analytics",
    items: [
      {
        href: "/occupation/computer-and-information-research-scientists",
        name: "Computer and Information Research Scientists",
      },
      {
        href: "/occupation/database-administrators",
        name: "Database Administrators",
      },
    ],
  },
  {
    title: "Software Development",
    href: "software-development",
    items: [
      {
        href: "/occupation/software-developers",
        name: "Software Developers",
      },
    ],
  },
  {
    title: "Generalist",
    href: "generalist",
    items: [
      {
        href: "/occupation/financial-analysts-and-advisors",
        name: "Financial Analysts and Advisors",
      },
      {
        href: "/occupation/logisticians-and-project-management-specialists",
        name: "Logisticians & Project Management Specialists",
      },
    ],
  },
  {
    title: "Machine Learning",
    href: "machine-learning",
    items: [
      {
        href: "/occupation/data-scientist",
        name: "Data Scientist",
      },
    ],
  },
];

// Copy of IOccupationDetails from @/app/lib/data.ts , remove once mock data no longer relevant
interface IOccupationDetails {
  name: string;
  description: string | undefined;
  jobTitles: string[] | undefined;
  employment: string | undefined;
  entrySalary: string | undefined;
  medianSalary: string | undefined;
  numberOfJobAds: string | undefined;
  currentlyEmployed: string | undefined;
  projectedGrowth: string | undefined;
  preferredCertifications: string[] | undefined;
  largestEmployers: string[] | undefined;
  topSkills: string[] | undefined;
}

export const occupationSelected: IOccupationDetails = {
  name: "Security Anaylst Placeholder",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus eum quos sunt consectetur fugit dolore illum itaque voluptatibus.\
    Explicabo doloribus repellendus voluptates esse at quo alias, recusandae deserunt nihil rerum.\
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus eum quos sunt consectetur fugit dolore illum itaque voluptatibus.\
    Explicabo doloribus repellendus voluptates esse at quo alias, recusandae deserunt nihil rerum",
  jobTitles: [
    "Job Title 1",
    "Job Title 2",
    "Job Title 3",
    "Job Title 4",
    "Job Title 5",
  ],
  employment: "52000",
  entrySalary: "75400",
  medianSalary: "105200",
  numberOfJobAds: "1234",
  currentlyEmployed: "5000",
  projectedGrowth: "7",
  preferredCertifications: [
    "Certified Software Development Professional",
    "AWS Certified Solutions Architect",
    "Certified ScrumMaster (CSM)",
    "Microsoft Certified: Azure Developer Associate",
    "Google Professional Cloud Developer",
  ],
  largestEmployers: ["Google", "Microsoft", "Oracle", "Zed"],
  topSkills: [
    "Javascript",
    "Java",
    "C#",
    "SQL",
    "Risk Management",
    "Critical Thinking",
  ],
};

export const regions = [
  { id: "250", name: "West Washington" },
  { id: "5321", name: "East Washington" },
  { id: "2215", name: "North Washington" },
  { id: "3525", name: "South Washington" },
];
