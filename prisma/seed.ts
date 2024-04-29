import { PrismaClient } from "@prisma/client";
import skillsData from "../data/skills"
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const { invoices, customers, revenue, users } = require('../app/lib/placeholder-data.js');

async function seedUsers() {
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword
      }
    });
  }
}

async function seedInvoices() {
  for (const invoice of invoices) {
    await prisma.invoice.create({
      data: {
        customerId: invoice.customer_id,
        amount: invoice.amount,
        status: invoice.status,
        date: new Date(invoice.date)
      }
    });
  }
}

async function seedCustomers() {
  for (const customer of customers) {
    await prisma.customer.create({
      data: {
        name: customer.name,
        email: customer.email,
        imageUrl: customer.image_url
      }
    });
  }
}

async function seedRevenue() {
  for (const rev of revenue) {
    await prisma.revenue.create({
      data: {
        month: rev.month,
        revenue: rev.revenue
      }
    });
  }
}

const subcategoriesData = [
    { skill_category: 'Agile Software Development' },
    { skill_category: 'Application Programming Interfaces (API)' },
    { skill_category: 'Artificial Intelligence and Machine Learning (AI/ML)' },
    { skill_category: 'Augmented and Virtual Reality (AR/VR)' },
    { skill_category: 'Backup Software' },
    { skill_category: 'Basic Technical Knowledge' },
    { skill_category: 'Blockchain' },
    { skill_category: 'C and C++' },
    { skill_category: 'Cloud Computing' },
    { skill_category: 'Cloud Solutions' },
    { skill_category: 'Collaborative Software' },
    { skill_category: 'Computer Hardware' },
    { skill_category: 'Computer Science' },
    { skill_category: 'Configuration Management' },
    { skill_category: 'Content Management Systems' },
    { skill_category: 'Cybersecurity' },
    { skill_category: 'Data Collection' },
    { skill_category: 'Data Management' },
    { skill_category: 'Data Storage' },
    { skill_category: 'Database Architecture and Administration' },
    { skill_category: 'Databases' },
    { skill_category: 'Distributed Computing' },
    { skill_category: 'Enterprise Application Management' },
    { skill_category: 'Enterprise Information Management' },
    { skill_category: 'Extensible Languages and XML' },
    { skill_category: 'Extraction, Transformation, and Loading (ETL)' },
    { skill_category: 'Firmware' },
    { skill_category: 'General Networking' },
    { skill_category: 'Geospatial Information and Technology' },
    { skill_category: 'Identity and Access Management' },
    { skill_category: 'Integrated Development Environments (IDEs)' },
    { skill_category: 'Internet of Things (IoT)' },
    { skill_category: 'iOS Development' },
    { skill_category: 'IT Automation' },
    { skill_category: 'IT Management' },
    { skill_category: 'Java' },
    { skill_category: 'JavaScript and jQuery' },
    { skill_category: 'Log Management' },
    { skill_category: 'Mainframe Technologies' },
    { skill_category: 'Malware Protection' },
    { skill_category: 'Microsoft Development Tools' },
    { skill_category: 'Microsoft Windows' },
    { skill_category: 'Middleware' },
    { skill_category: 'Mobile Development' },
    { skill_category: 'Network Protocols' },
    { skill_category: 'Network Security' },
    { skill_category: 'Networking Hardware' },
    { skill_category: 'Networking Software' },
    { skill_category: 'Operating Systems' },
    { skill_category: 'Other Programming Languages' },
    { skill_category: 'Query Languages' },
    { skill_category: 'Scripting' },
    { skill_category: 'Scripting Languages' },
    { skill_category: 'Search Engines' },
    { skill_category: 'Servers' },
    { skill_category: 'Software Development' },
    { skill_category: 'Software Development Tools' },
    { skill_category: 'Software Quality Assurance' },
    { skill_category: 'System Design and Implementation' },
    { skill_category: 'Systems Administration' },
    { skill_category: 'Technical Support and Services' },
    { skill_category: 'Telecommunications' },
    { skill_category: 'Test Automation' },
    { skill_category: 'Version Control' },
    { skill_category: 'Video and Web Conferencing' },
    { skill_category: 'Virtualization and Virtual Machines' },
    { skill_category: 'Web Content' },
    { skill_category: 'Web Design and Development' },
    { skill_category: 'Web Services' },
    { skill_category: 'Wireless Technologies' },
];


async function main() {
    console.log(`Start seeding ...`);
    for (const category of subcategoriesData) {
        const subcategory = await prisma.subcategories.create({
            data: category,
        });
        console.log(`Created subcategory with id: ${subcategory.id}`);
        // Seed skills that belong to this subcategory
        const relatedSkills = skillsData.filter((s) => s.skill_category === category.skill_category);
        for (const skill of relatedSkills) {
            await prisma.skills.create({
                data: {
                    skill: skill.skill,
                    info_url: skill.info_url,
                    subcategory_id: subcategory.id  // Linking with foreign key
                },
            });
        }
    }
    await seedUsers();
    await seedCustomers();
    await seedInvoices();
    await seedRevenue();
    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });