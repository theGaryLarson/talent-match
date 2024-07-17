import  {PrismaClient} from '@prisma/client';
import skillsData_v2 from '../data/skills_v2.mjs';
import {v4 as uuidv4} from 'uuid';
import {faker} from "@faker-js/faker";
import {users,} from '../app/lib/placeholder-data.mjs';

faker.seed(123); // set seed so generated data is deterministic
const prisma = new PrismaClient();


/////////////////////////////////////////////////
////// Arrays to simulate realistic data ////////
/////////////////////////////////////////////////

const roles = [
    'Admin',
    'Educator',
    'Jobseeker',
    'Employer',
]

const subcategoriesData = [
    {skill_category: 'Agile Software Development'},
    {skill_category: 'Application Programming Interfaces (API)'},
    {skill_category: 'Artificial Intelligence and Machine Learning (AI/ML)'},
    {skill_category: 'Augmented and Virtual Reality (AR/VR)'},
    {skill_category: 'Backup Software'},
    {skill_category: 'Basic Technical Knowledge'},
    {skill_category: 'Blockchain'},
    {skill_category: 'C and C++'},
    {skill_category: 'Cloud Computing'},
    {skill_category: 'Cloud Solutions'},
    {skill_category: 'Collaborative Software'},
    {skill_category: 'Computer Hardware'},
    {skill_category: 'Computer Science'},
    {skill_category: 'Configuration Management'},
    {skill_category: 'Content Management Systems'},
    {skill_category: 'Cybersecurity'},
    {skill_category: 'Data Collection'},
    {skill_category: 'Data Management'},
    {skill_category: 'Data Storage'},
    {skill_category: 'Database Architecture and Administration'},
    {skill_category: 'Databases'},
    {skill_category: 'Distributed Computing'},
    {skill_category: 'Enterprise Application Management'},
    {skill_category: 'Enterprise Information Management'},
    {skill_category: 'Extensible Languages and XML'},
    {skill_category: 'Extraction, Transformation, and Loading (ETL)'},
    {skill_category: 'Firmware'},
    {skill_category: 'General Networking'},
    {skill_category: 'Geospatial Information and Technology'},
    {skill_category: 'Identity and Access Management'},
    {skill_category: 'Integrated Development Environments (IDEs)'},
    {skill_category: 'Internet of Things (IoT)'},
    {skill_category: 'iOS Development'},
    {skill_category: 'IT Automation'},
    {skill_category: 'IT Management'},
    {skill_category: 'Java'},
    {skill_category: 'JavaScript and jQuery'},
    {skill_category: 'Log Management'},
    {skill_category: 'Mainframe Technologies'},
    {skill_category: 'Malware Protection'},
    {skill_category: 'Microsoft Development Tools'},
    {skill_category: 'Microsoft Windows'},
    {skill_category: 'Middleware'},
    {skill_category: 'Mobile Development'},
    {skill_category: 'Network Protocols'},
    {skill_category: 'Network Security'},
    {skill_category: 'Networking Hardware'},
    {skill_category: 'Networking Software'},
    {skill_category: 'Operating Systems'},
    {skill_category: 'Other Programming Languages'},
    {skill_category: 'Query Languages'},
    {skill_category: 'Scripting'},
    {skill_category: 'Scripting Languages'},
    {skill_category: 'Search Engines'},
    {skill_category: 'Servers'},
    {skill_category: 'Software Development'},
    {skill_category: 'Software Development Tools'},
    {skill_category: 'Software Quality Assurance'},
    {skill_category: 'System Design and Implementation'},
    {skill_category: 'Systems Administration'},
    {skill_category: 'Technical Support and Services'},
    {skill_category: 'Telecommunications'},
    {skill_category: 'Test Automation'},
    {skill_category: 'Version Control'},
    {skill_category: 'Video and Web Conferencing'},
    {skill_category: 'Virtualization and Virtual Machines'},
    {skill_category: 'Web Content'},
    {skill_category: 'Web Design and Development'},
    {skill_category: 'Web Services'},
    {skill_category: 'Wireless Technologies'},
]; // Lightcast IT subcategories data

const techEdPrograms = [
    "None",
    "Computer Science",
    "Information Technology",
    "Software Engineering",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Network Administration",
    "Cloud Computing",
    "Mobile Application Development",
    "Web Development",
    "Database Management",
    "Game Development",
    "Digital Forensics",
    "IT Project Management",
    "Systems Analysis",
    "Computer Engineering",
    "Robotics",
    "Embedded Systems",
    "Computer Graphics",
    "Information Systems",
    "Business Information Technology",
    "Health Informatics",
    "Human-Computer Interaction",
    "Augmented Reality Development",
    "Virtual Reality Development",
    "Blockchain Technology",
    "Machine Learning",
    "Big Data Analytics",
    "IT Support Specialist",
    "DevOps Engineering",
    "IT Networking",
    "Software Quality Assurance",
    "Ethical Hacking",
    "Programming Languages",
    "Technical Writing",
    "IT Entrepreneurship",
    "IT Consulting",
    "Geographic Information Systems (GIS)",
    "Bioinformatics",
    "Quantum Computing",
    "Computer and Network Security",
    "Multimedia Technology",
    "Internet of Things (IoT)",
    "Artificial Intelligence and Machine Learning",
    "IT Service Management",
    "Information Assurance",
    "Software Architecture",
    "Mobile and Web Design",
    "Technology Management",
    "Computer Systems Technology",
    "Technical Studies in IT"
];

const itOccupationTechnologyAreas = [
    "Cybersecurity",
    "Cloud Computing",
    "Data Science",
    "Artificial Intelligence",
    "Network Administration",
    "Software Development",
    "Database Management",
    "DevOps",
    "Web Development",
    "Mobile App Development",
    "IT Support",
    "System Analysis",
    "IT Project Management",
    "Machine Learning",
    "Big Data Analytics"
];

const predefinedResponsibilities = [
    "Develop and maintain software applications.",
    "Collaborate with cross-functional teams.",
    "Participate in code reviews.",
    "Write and maintain technical documentation.",
    "Troubleshoot and debug issues.",
    "Implement new features based on user feedback.",
    "Ensure code quality and performance.",
    "Manage project timelines and deliverables.",
    "Conduct testing and quality assurance.",
    "Provide technical support to team members."
];

const itProjectTitles = [
    "Website Redesign",
    "Mobile App Development",
    "Cloud Migration",
    "Cybersecurity Implementation",
    "Database Optimization",
    "AI/ML Model Development",
    "Network Infrastructure Upgrade",
    "E-commerce Platform Development",
    "DevOps Pipeline Automation",
    "Enterprise Software Integration",
    "Customer Relationship Management (CRM) System",
    "Data Analytics Platform",
    "Content Management System (CMS)",
    "API Development and Integration",
    "IoT Solution Deployment",
    "Blockchain Implementation",
    "Virtualization Project",
    "Backup and Disaster Recovery Plan",
    "IT Security Audit",
    "User Authentication and Authorization System",
    "Big Data Processing",
    "Microservices Architecture Implementation",
    "Automated Testing Framework",
    "Legacy System Modernization",
    "Unified Communications Solution",
    "Artificial Intelligence Chatbot",
    "Business Intelligence Dashboard",
    "IT Service Management (ITSM) Tool",
    "Robotic Process Automation (RPA)",
    "Cloud-Based Collaboration Suite",
    "Network Security Enhancement",
    "Supply Chain Management System",
    "Predictive Analytics Solution",
    "Virtual Reality (VR) Application",
    "Augmented Reality (AR) Application",
    "Video Conferencing System Deployment",
    "Remote Work Infrastructure",
    "Server Consolidation",
    "Software-as-a-Service (SaaS) Development",
    "Customer Data Platform (CDP)",
    "IT Asset Management System",
    "Project Management Tool",
    "Electronic Health Record (EHR) System",
    "Healthcare Information System",
    "Fleet Management System",
    "IT Compliance Management",
    "Performance Monitoring Solution",
    "Help Desk System Implementation",
    "Scalable Storage Solution"
];

const developmentTeamRoles = [
    "Lead Developer",
    "Project Manager",
    "Backend Developer",
    "Frontend Developer",
    "Full Stack Developer",
    "Quality Assurance Engineer",
    "UI/UX Designer",
    "Product Owner",
    "Scrum Master",
    "DevOps Engineer",
    "Database Administrator",
    "Business Analyst",
    "Technical Writer",
    "System Architect",
    "Mobile Developer",
    "Security Specialist",
    "Release Manager",
    "Support Engineer",
    "Data Scientist",
    "Machine Learning Engineer"
];

const waStateCountiesWithZipCodes = [
    {
        county: "Adams",
        zipCodes: ["99341", "99344", "99326", "99328", "99330"]
    },
    {
        county: "Asotin",
        zipCodes: ["99401", "99402", "99403"]
    },
    {
        county: "Benton",
        zipCodes: ["99320", "99336", "99337", "99338", "99350", "99352", "99353", "99354"]
    },
    {
        county: "Chelan",
        zipCodes: ["98801", "98811", "98815", "98816", "98817", "98821", "98822", "98826", "98828", "98831", "98847"]
    },
    {
        county: "Clallam",
        zipCodes: ["98305", "98324", "98326", "98331", "98350", "98357", "98362", "98363", "98381", "98382"]
    },
    {
        county: "Clark",
        zipCodes: ["98601", "98604", "98606", "98607", "98629", "98642", "98660", "98661", "98662", "98663", "98664", "98665", "98666", "98668", "98671", "98674", "98675", "98682", "98683", "98684", "98685", "98686", "98687"]
    },
    {
        county: "Columbia",
        zipCodes: ["99328", "99361"]
    },
    {
        county: "Cowlitz",
        zipCodes: ["98603", "98611", "98625", "98626", "98632", "98645", "98674"]
    },
    {
        county: "Douglas",
        zipCodes: ["98802", "98807", "98816", "98821", "98822", "98824", "98829", "98830", "98843", "98845", "98858"]
    },
    {
        county: "Ferry",
        zipCodes: ["99121", "99138", "99140", "99150", "99166"]
    },
    {
        county: "Franklin",
        zipCodes: ["99301", "99330", "99335", "99343"]
    },
    {
        county: "Garfield",
        zipCodes: ["99347"]
    },
    {
        county: "Grant",
        zipCodes: ["98823", "98824", "98832", "98837", "98848", "98851", "98853", "98857", "98860", "99321", "99344", "99349", "99357"]
    },
    {
        county: "Grays Harbor",
        zipCodes: ["98520", "98526", "98535", "98536", "98537", "98541", "98547", "98550", "98552", "98557", "98559", "98562", "98563", "98566", "98568", "98569", "98575", "98583", "98587"]
    },
    {
        county: "Island",
        zipCodes: ["98239", "98249", "98253", "98260", "98277", "98278", "98282"]
    },
    {
        county: "Jefferson",
        zipCodes: ["98320", "98325", "98339", "98358", "98365", "98368", "98376"]
    },
    {
        county: "King",
        zipCodes: ["98001", "98002", "98003", "98004", "98005", "98006", "98007", "98008", "98009", "98010", "98011", "98013", "98014", "98015", "98019", "98022", "98023", "98024", "98025", "98027", "98028", "98029", "98030", "98031", "98032", "98033", "98034", "98035", "98038", "98039", "98040", "98041", "98042", "98045", "98047", "98050", "98051", "98052", "98053", "98055", "98056", "98057", "98058", "98059", "98062", "98063", "98064", "98065", "98070", "98071", "98072", "98073", "98074", "98075", "98077", "98082", "98083", "98087", "98089", "98092", "98093", "98101", "98102", "98103", "98104", "98105", "98106", "98107", "98108", "98109", "98110", "98111", "98112", "98113", "98114", "98115", "98116", "98117", "98118", "98119", "98121", "98122", "98124", "98125", "98126", "98127", "98129", "98131", "98132", "98133", "98134", "98136", "98138", "98139", "98141", "98144", "98145", "98146", "98148", "98151", "98154", "98155", "98158", "98160", "98161", "98164", "98166", "98168", "98170", "98174", "98175", "98177", "98178", "98181", "98185", "98188", "98190", "98191", "98194", "98195", "98198", "98199"]
    },
    {
        county: "Kitsap",
        zipCodes: ["98310", "98311", "98312", "98314", "98315", "98322", "98337", "98340", "98342", "98345", "98346", "98353", "98359", "98364", "98366", "98367", "98370", "98378", "98380", "98383", "98384", "98386", "98393"]
    },
    {
        county: "Kittitas",
        zipCodes: ["98922", "98925", "98926", "98934", "98940", "98941", "98943", "98946", "98950"]
    },
    {
        county: "Klickitat",
        zipCodes: ["98602", "98605", "98613", "98617", "98619", "98620", "98623", "98628", "98635", "98650", "98670", "98672", "98673"]
    },
    {
        county: "Lewis",
        zipCodes: ["98336", "98355", "98356", "98377", "98522", "98531", "98532", "98533", "98538", "98539", "98542", "98544", "98564", "98565", "98570", "98572", "98582", "98585", "98591", "98593", "98596", "98597"]
    },
    {
        county: "Lincoln",
        zipCodes: ["99008", "99009", "99029", "99122", "99134", "99144", "99159", "99185"]
    },
    {
        county: "Mason",
        zipCodes: ["98524", "98528", "98546", "98548", "98555", "98560", "98584", "98588", "98592"]
    },
    {
        county: "Okanogan",
        zipCodes: ["98812", "98814", "98819", "98827", "98829", "98833", "98834", "98840", "98841", "98844", "98846", "98849", "98855", "98856", "98859", "99155"]
    },
    {
        county: "Pacific",
        zipCodes: ["98527", "98535", "98547", "98554", "98586", "98614", "98624", "98631", "98637", "98640", "98641", "98644"]
    },
    {
        county: "Pend Oreille",
        zipCodes: ["99119", "99139", "99152", "99156", "99180"]
    },
    {
        county: "Pierce",
        zipCodes: ["98303", "98304", "98321", "98323", "98327", "98328", "98329", "98330", "98332", "98333", "98335", "98338", "98348", "98349", "98351", "98352", "98354", "98360", "98371", "98372", "98373", "98374", "98375", "98385", "98387", "98388", "98390", "98391", "98394", "98395", "98396", "98397", "98398", "98401", "98402", "98403", "98404", "98405", "98406", "98407", "98408", "98409", "98411", "98412", "98413", "98415", "98416", "98417", "98418", "98419", "98421", "98422", "98424", "98430", "98431", "98433", "98438", "98439", "98442", "98443", "98444", "98445", "98446", "98447", "98448", "98450", "98455", "98460", "98464", "98465", "98466", "98467", "98471", "98481", "98490", "98493", "98496", "98497", "98498", "98499"]
    },
    {
        county: "San Juan",
        zipCodes: ["98222", "98243", "98245", "98250", "98261", "98279", "98280", "98286", "98297"]
    },
    {
        county: "Skagit",
        zipCodes: ["98221", "98232", "98233", "98235", "98237", "98238", "98240", "98255", "98257", "98263", "98267", "98273", "98274", "98283", "98284"]
    },
    {
        county: "Skamania",
        zipCodes: ["98603", "98605", "98610", "98623", "98639", "98648", "98651", "98671"]
    },
    {
        county: "Snohomish",
        zipCodes: ["98012", "98020", "98021", "98026", "98036", "98037", "98043", "98046", "98072", "98082", "98087", "98201", "98203", "98204", "98205", "98206", "98207", "98208", "98213", "98223", "98224", "98241", "98252", "98256", "98258", "98259", "98270", "98271", "98272", "98275", "98287", "98290", "98291", "98292", "98293", "98294", "98296", "98298"]
    },
    {
        county: "Spokane",
        zipCodes: ["99001", "99003", "99004", "99005", "99006", "99008", "99009", "99011", "99012", "99014", "99016", "99018", "99019", "99020", "99021", "99022", "99023", "99025", "99026", "99027", "99029", "99030", "99031", "99032", "99036", "99037", "99039", "99040", "99110", "99122", "99134", "99156", "99201", "99202", "99203", "99204", "99205", "99206", "99207", "99208", "99209", "99210", "99211", "99212", "99213", "99214", "99215", "99216", "99217", "99218", "99219", "99220", "99223", "99224", "99228", "99251", "99252", "99256", "99258", "99260", "99299"]
    },
    {
        county: "Stevens",
        zipCodes: ["99006", "99009", "99013", "99017", "99026", "99101", "99110", "99114", "99126", "99129", "99131", "99137", "99141", "99148", "99151", "99157", "99160", "99167", "99181"]
    },
    {
        county: "Thurston",
        zipCodes: ["98501", "98502", "98503", "98504", "98505", "98506", "98507", "98508", "98509", "98511", "98512", "98513", "98516", "98530", "98531", "98540", "98556", "98576", "98597"]
    },
    {
        county: "Wahkiakum",
        zipCodes: ["98612", "98621", "98647"]
    },
    {
        county: "Walla Walla",
        zipCodes: ["99324", "99329", "99348", "99360", "99362"]
    },
    {
        county: "Whatcom",
        zipCodes: ["98225", "98226", "98227", "98228", "98229", "98230", "98231", "98240", "98244", "98247", "98248", "98262", "98264", "98266", "98276", "98281", "98295"]
    },
    {
        county: "Whitman",
        zipCodes: ["99033", "99102", "99104", "99111", "99113", "99125", "99128", "99130", "99133", "99136", "99143", "99149", "99158", "99161", "99163", "99164", "99170", "99171", "99174", "99176", "99179", "99185"]
    },
    {
        county: "Yakima",
        zipCodes: ["98901", "98902", "98903", "98904", "98907", "98908", "98909", "98920", "98921", "98923", "98930", "98932", "98933", "98935", "98936", "98937", "98938", "98939", "98942", "98944", "98947", "98948", "98951", "98952", "98953"]
    }
];

//TODO: add legit logo_urls
const itCertifications = [
    {
        name: "AWS Certified Solutions Architect",
        issuing_org: "Amazon Web Services",
        credential_url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
        credential_id: "AWS-CSA-001",
        logo_url: "https://d1.awsstatic.com/certification/badges/AWS-Certified-Solutions-Architect-Associate_badge_150x150.e359ae4a6d4d82c3e31d4f9104c8d389b56a2423.png"
    },
    {
        name: "Certified Information Systems Security Professional (CISSP)",
        issuing_org: "ISC2",
        credential_url: "https://www.isc2.org/Certifications/CISSP",
        credential_id: "CISSP-002",
        logo_url: "https://www.isc2.org/-/media/ISC2/Certifications/CISSP/CISSP-Logo.ashx"
    },
    {
        name: "Certified Ethical Hacker (CEH)",
        issuing_org: "EC-Council",
        credential_url: "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/",
        credential_id: "CEH-003",
        logo_url: "https://www.eccouncil.org/wp-content/uploads/2021/08/CEH-V11.png"
    },
    {
        name: "Cisco Certified Network Associate (CCNA)",
        issuing_org: "Cisco",
        credential_url: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html",
        credential_id: "CCNA-004",
        logo_url: "https://www.cisco.com/c/dam/en_us/training-events/certifications/professional/ccna-500.png"
    },
    {
        name: "CompTIA A+",
        issuing_org: "CompTIA",
        credential_url: "https://www.comptia.org/certifications/a",
        credential_id: "CompTIA-A-005",
        logo_url: "https://www.comptia.org/Content/Images/CompTIA-Badges/Badge-CompTIA-A.png"
    },
    {
        name: "CompTIA Network+",
        issuing_org: "CompTIA",
        credential_url: "https://www.comptia.org/certifications/network",
        credential_id: "CompTIA-N-006",
        logo_url: "https://www.comptia.org/Content/Images/CompTIA-Badges/Badge-CompTIA-Network.png"
    },
    {
        name: "CompTIA Security+",
        issuing_org: "CompTIA",
        credential_url: "https://www.comptia.org/certifications/security",
        credential_id: "CompTIA-S-007",
        logo_url: "https://www.comptia.org/Content/Images/CompTIA-Badges/Badge-CompTIA-Security.png"
    },
    {
        name: "Google Cloud Professional Data Engineer",
        issuing_org: "Google",
        credential_url: "https://cloud.google.com/certification/data-engineer",
        credential_id: "GCP-DE-008",
        logo_url: "https://cloud.google.com/images/certifications/data-engineer-cpd.png"
    },
    {
        name: "Google Cloud Professional Cloud Architect",
        issuing_org: "Google",
        credential_url: "https://cloud.google.com/certification/cloud-architect",
        credential_id: "GCP-CA-009",
        logo_url: "https://cloud.google.com/images/certifications/cloud-architect-cpd.png"
    },
    {
        name: "Microsoft Certified: Azure Fundamentals",
        issuing_org: "Microsoft",
        credential_url: "https://docs.microsoft.com/en-us/learn/certifications/azure-fundamentals/",
        credential_id: "MS-AF-010",
        logo_url: "https://query.prod.cms.rt.microsoft.com/cms/api/am/imageFileData/RWRuDe"
    },
    {
        name: "Microsoft Certified: Azure Solutions Architect Expert",
        issuing_org: "Microsoft",
        credential_url: "https://docs.microsoft.com/en-us/learn/certifications/azure-solutions-architect/",
        credential_id: "MS-ASAE-011",
        logo_url: "https://query.prod.cms.rt.microsoft.com/cms/api/am/imageFileData/RE2PjDI"
    },
    {
        name: "Microsoft Certified: Azure Administrator Associate",
        issuing_org: "Microsoft",
        credential_url: "https://docs.microsoft.com/en-us/learn/certifications/azure-administrator/",
        credential_id: "MS-AAA-012",
        logo_url: "https://query.prod.cms.rt.microsoft.com/cms/api/am/imageFileData/RWBLOt"
    },
    {
        name: "Certified Information Security Manager (CISM)",
        issuing_org: "ISACA",
        credential_url: "https://www.isaca.org/credentialing/cism",
        credential_id: "CISM-013",
        logo_url: "https://www.isaca.org/-/media/images/isacadp/logo/logo-cism-250.png"
    },
    {
        name: "Certified Information Systems Auditor (CISA)",
        issuing_org: "ISACA",
        credential_url: "https://www.isaca.org/credentialing/cisa",
        credential_id: "CISA-014",
        logo_url: "https://www.isaca.org/-/media/images/isacadp/logo/logo-cisa-250.png"
    },
    {
        name: "Project Management Professional (PMP)",
        issuing_org: "PMI",
        credential_url: "https://www.pmi.org/certifications/project-management-pmp",
        credential_id: "PMP-015",
        logo_url: "https://www.pmi.org/-/media/pmi/images/certification-logos/logo-pmp.png"
    },
    {
        name: "Certified ScrumMaster (CSM)",
        issuing_org: "Scrum Alliance",
        credential_url: "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster",
        credential_id: "CSM-016",
        logo_url: "https://www.scrumalliance.org/Content/Images/Home/CSM-Logo.png"
    },
    {
        name: "VMware Certified Professional (VCP)",
        issuing_org: "VMware",
        credential_url: "https://www.vmware.com/education-services/certification/vcp.html",
        credential_id: "VCP-017",
        logo_url: "https://mylearn.vmware.com/global/images/certification/VCP-DCV.png"
    },
    {
        name: "Oracle Certified Java Programmer",
        issuing_org: "Oracle",
        credential_url: "https://education.oracle.com/java-se-11-programmer-i/pexam_1Z0-815",
        credential_id: "OCJP-018",
        logo_url: "https://education.oracle.com/education/javacert/ocp/ocp-certification-seal.png"
    },
    {
        name: "Red Hat Certified System Administrator (RHCSA)",
        issuing_org: "Red Hat",
        credential_url: "https://www.redhat.com/en/services/certification/rhcsa",
        credential_id: "RHCSA-019",
        logo_url: "https://www.redhat.com/cms/managed-files/styles/xlarge/s3/rhcert.png"
    },
    {
        name: "ITIL Foundation Certification",
        issuing_org: "AXELOS",
        credential_url: "https://www.axelos.com/certifications/itil-certifications/itil-foundation",
        credential_id: "ITIL-020",
        logo_url: "https://www.axelos.com/brand-assets/images/logos/itil-master-axelos.png"
    }
];

const socialMediaPlatforms = [
    { platform: 'Facebook', social_logo_url: faker.internet.url() },
    { platform: 'X (Twitter)', social_logo_url: faker.internet.url() },
    { platform: 'Instagram', social_logo_url: faker.internet.url() },
    { platform: 'LinkedIn', social_logo_url: faker.internet.url() },
    { platform: 'Snapchat', social_logo_url: faker.internet.url() },
    { platform: 'Pinterest', social_logo_url: faker.internet.url() },
    { platform: 'TikTok', social_logo_url: faker.internet.url() },
    { platform: 'Reddit', social_logo_url: faker.internet.url() },
    { platform: 'YouTube', social_logo_url: faker.internet.url() },
    { platform: 'WhatsApp', social_logo_url: faker.internet.url() },
    { platform: 'WeChat', social_logo_url: faker.internet.url() },
    { platform: 'Telegram', social_logo_url: faker.internet.url() },
    { platform: 'Tumblr', social_logo_url: faker.internet.url() },
    { platform: 'Quora', social_logo_url: faker.internet.url() },
    { platform: 'Viber', social_logo_url: faker.internet.url() },
    { platform: 'Discord', social_logo_url: faker.internet.url() },
    { platform: 'Twitch', social_logo_url: faker.internet.url() },
    { platform: 'Flickr', social_logo_url: faker.internet.url() },
    { platform: 'Medium', social_logo_url: faker.internet.url() },
    { platform: 'Clubhouse', social_logo_url: faker.internet.url() }
];

const industrySectors = [
    "Agriculture",
    "Automotive",
    "Banking and Financial Services",
    "Biotechnology",
    "Construction",
    "Consumer Goods",
    "Education",
    "Energy",
    "Healthcare",
    "Information Technology",
    "Insurance",
    "Manufacturing",
    "Media and Entertainment",
    "Pharmaceuticals",
    "Real Estate",
    "Retail",
    "Telecommunications",
    "Transportation and Logistics",
    "Travel and Hospitality",
    "Utilities"
];

const itJobTitles = [
    "Software Engineer",
    "Data Scientist",
    "System Administrator",
    "Network Engineer",
    "IT Support Specialist",
    "Cybersecurity Analyst",
    "DevOps Engineer",
    "Cloud Architect",
    "Database Administrator",
    "Front End Developer",
    "Back End Developer",
    "Full Stack Developer",
    "UX/UI Designer",
    "Product Manager",
    "IT Project Manager",
    "QA Engineer",
    "Business Analyst",
    "Solutions Architect",
    "Machine Learning Engineer",
    "Mobile App Developer",
    "Technical Support Engineer",
    "IT Consultant",
    "Site Reliability Engineer",
    "Systems Analyst",
    "Technical Writer",
    "Information Security Manager",
    "Data Analyst",
    "Software Architect",
    "Scrum Master",
    "IT Operations Manager",
    "BI Developer",
    "AI Engineer",
    "IT Director",
    "Technical Recruiter",
    "Salesforce Developer",
    "ERP Consultant",
    "Network Administrator",
    "Help Desk Technician",
    "Penetration Tester",
    "Release Manager",
    "IT Auditor",
    "Big Data Engineer",
    "IoT Specialist",
    "Blockchain Developer",
    "IT Trainer",
    "Game Developer",
    "AR/VR Developer",
    "IT Asset Manager",
    "E-commerce Specialist"
];

/////////////////////////////////////////////////
////////////   helper functions  ////////////////
/////////////////////////////////////////////////


// Don't need. running 'prisma migrate reset' simplifies
async function clearDatabase() {
    try {
        await prisma.skills.deleteMany({});
        await prisma.skill_subcategories.deleteMany({});
        await prisma.contacts.deleteMany({});
        await prisma.pathways.deleteMany({});
        // await prisma.edu_institutions.deleteMany({});
        await prisma.jobseekers.deleteMany({});
        // await prisma.edu_addresses.deleteMany({});

        console.log('Database cleared successfully.');
    } catch (error) {
        console.error('Failed to clear the database:', error);
        throw error;
    }
}

// Helper function to format date to ISO-8601 to match data type in db
function formatISODate(date) {
    return new Date(date).toISOString();
}

function generateE164PhoneNumber() {
    const countryCode = faker.number.int({ min: 1, max: 999 }).toString();
    const nationalNumber = faker.number.int({ min: 1000000000, max: 9999999999 }).toString();
    return `+${countryCode}${nationalNumber}`;
}

function generateProblemSolvedDescription(numSentences = 3) {
    return faker.lorem.sentences(numSentences);
}

function generateResponsibilities(numResponsibilities = 3) {
    const responsibilities = [];
    for (let i = 0; i < numResponsibilities; i++) {
        const randomIndex = faker.number.int({min: 0, max: predefinedResponsibilities.length - 1});
        responsibilities.push(predefinedResponsibilities[randomIndex]);
    }
    return responsibilities.join('\n');
}

function generateSalesPitch(firstName, lastName) {
    const jobTitle = faker.person.jobTitle();
    const companyName = faker.company.name();
    const yearsOfExperience = faker.number.int({min: 1, max: 20});
    const skills = [
        faker.hacker.adjective() + " " + faker.hacker.noun(),
        faker.hacker.adjective() + " " + faker.hacker.noun(),
        faker.hacker.adjective() + " " + faker.hacker.noun()
    ];
    return `
    Hi, my name is ${firstName} ${lastName}. I am a highly skilled ${jobTitle} with over ${yearsOfExperience} years of experience in the industry.
    I have a proven track record of success at ${companyName}, where I contributed to numerous high-profile projects.
    My key skills include ${skills.join(", ")}.
  `;
}

function generateSSN() {
    const ssn = faker.number.int({ min: 100000000, max: 999999999 }).toString();
    return `${ssn.substring(0, 3)}-${ssn.substring(3, 5)}-${ssn.substring(5, 9)}`;
}

function generateCompensation(isInternship) {
    if (isInternship) {
        const stipend = faker.finance.amount({min: 1000, max: 5000, dec:0, autoFormat: true}); // Generate a stipend amount between $1000 and $5000
        return `$${stipend} stipend`;
    } else {
        const minSalary = faker.finance.amount({min: 50000, max: 70000, dec:0, autoFormat: true}); // Generate a minimum salary between $50,000 and $70,000
        const maxSalary = faker.finance.amount({min: 80000, max: 120000, dec:0, autoFormat: true}); // Generate a maximum salary between $80,000 and $100,000
        return `$${minSalary} - $${maxSalary} / year`;
    }
}

function getRandomUserPhoto() {
    const gender = faker.helpers.arrayElement(['men', 'women']);
    const number = faker.number.int({min: 0, max: 99});
    return `https://randomuser.me/api/portraits/${gender}/${number}.jpg`;
}

const racesAndEthnicities = [
    "White",
    "Black or African American",
    "American Indian or Alaska Native",
    "Asian",
    "Native Hawaiian or Other Pacific Islander",
    "Hispanic or Latino",
    "Middle Eastern or North African",
    "Mixed Race",
    "Other"
];

/////////////////////////////////////////////////
/////////////   seed functions  /////////////////
/////////////////////////////////////////////////


///////        Employer Data      ///////////////
async function seedContacts(numContacts = 4) {
    console.log('Seeding Contacts...')
    if (numContacts <= 4) {
        for (let idx = 0; idx < numContacts; idx++) {
            // const hashedPassword = await bcryptjs.hash(user.password, 10);
            await prisma.contacts.create({
                data: {
                    user_id: uuidv4(),
                    first_name: users[idx].firstName,
                    last_name: users[idx].lastName,
                    birthdate: formatISODate(users[idx].birthDate),
                    email: users[idx].email,
                    // password: hashedPassword,
                    role: users[idx].role,
                    phone: null,
                    gender: null,
                    race: null,
                    photo_url: getRandomUserPhoto(),
                }
            });
        }
    } else {
        for (let idx = 0; idx < numContacts; idx++) {
            const fName = faker.person.firstName();
            const lName = faker.person.lastName();
            await prisma.contacts.create({
                data: {
                    user_id: uuidv4(),
                    first_name: fName,
                    last_name: lName,
                    birthdate: faker.date.birthdate({min: 18, max: 65, mode: "age"}),
                    email: faker.internet.email({firstName: fName, lastName: lName}),
                    role: faker.helpers.arrayElement(roles),
                    phone: generateE164PhoneNumber(),
                    gender: faker.person.gender(),
                    race: faker.helpers.arrayElement(racesAndEthnicities),
                    photo_url: getRandomUserPhoto(),
                }
            });
        }
    }
    console.log(`Seeded ${numContacts} contacts.\n`)
}

async function seedContactAddresses() {
    console.log(`Seeding Contact Addresses...`)
    const contacts = await prisma.contacts.findMany();
    for (const contact of contacts) {
        const regionInfo = faker.helpers.arrayElement(waStateCountiesWithZipCodes);
        await prisma.contact_addresses.create({
            data: {
                contact_address_id: uuidv4(),
                user_id: contact.user_id,
                zip: faker.helpers.arrayElement(regionInfo.zipCodes),
                state: 'WA',
                city: faker.location.city(),
                county: regionInfo.county,

            }
        })
    }
    console.log(`Seeded ${contacts.length} Contact Addresses.\n`)
}

async function seedPathways() {
    const pathways = ["Cloud Computing", "Software Development", "Data Analytics"]
    console.log('Seeding Pathways...')
    for (const path of pathways) {
        await prisma.pathways.create({
            data: {
                pathway_id: uuidv4(),
                pathway_title: path,
            }
        });
    }
    console.log(`Seeded ${pathways.length} Pathways.\n`)
}

async function seedTechnologyAreas() {
    console.log('Seeding Technology Areas...')
    for (const techArea of itOccupationTechnologyAreas) {
        await prisma.technology_areas.create({
            data: {
                technology_area_id: uuidv4(),
                title: techArea,
            }
        });
    }
    console.log(`Seeded ${itOccupationTechnologyAreas.length} technology areas.\n`)
}

async function seedEduInstitutions() {
    const institutions = [];
    console.log('Seeding Education Institutions...');
    for (let i = 0; i < 10; i++) {  // Generate 10 mock institutions
        institutions.push({
            edu_institution_id: uuidv4(),
            name: faker.company.name(),
            contact_email: faker.internet.email(),
            edu_url: faker.internet.url(),
        });
    }

    for (const institution of institutions) {
        await prisma.edu_institutions.create({
            data: institution,
        });
    }
    console.log(`Seeded ${institutions.length} institutions.\n`);
}

async function SeedEduAddresses() {
    console.log(`Seeding Institution Addresses...`);
    const edInstitutions = await prisma.edu_institutions.findMany({
        select: {
            edu_institution_id: true,
        }
    });
    const addresses = edInstitutions.map(institution => {
        const regionInfo = faker.helpers.arrayElement(waStateCountiesWithZipCodes);
        return {
            edu_address_id: uuidv4(),
            edu_institution_id: institution.edu_institution_id,
            street1: faker.location.streetAddress(),
            street2: faker.location.secondaryAddress(),
            city: faker.location.city(),
            state: regionInfo.county,
            zip: faker.helpers.arrayElement(regionInfo.zipCodes),
        };
    });

    for (const address of addresses) {
        await prisma.edu_addresses.create({
            data: address,
        });
    }
    console.log(`Seeded ${addresses.length} Institution Addresses.\n`);
}

async function seedSubcategories() {
    console.log('Seeding IT skill subcategories from Lightcast...')
    const subcategoryPromises = subcategoriesData.map(category => {
        return prisma.skill_subcategories.create({
            data: {
                skill_subcategory_id: uuidv4(),
                subcategory_name: category.skill_category,
                subcategory_description: ""
            }
        });
    });

    const subcategories = await Promise.all(subcategoryPromises);
    console.log(`Seeded ${subcategories.length} IT skill subcategories.\n`)
    return subcategories;
}

async function seedSkills() {
    const subcategories = await prisma.skill_subcategories.findMany();
    console.log('Seeding skills...')
    let skillsCount = 0;
    const skillsPromises = subcategories.map(subcategory => {
        const relatedSkills = skillsData_v2.filter(
            (s) => s.skill_category.toLowerCase().trim() === subcategory.subcategory_name.toLowerCase().trim(),
        );
        skillsCount += relatedSkills.length
        return Promise.all(relatedSkills.map(skill => {
            return prisma.skills.create({
                data: {
                    skill_id: uuidv4(),
                    skill_name: skill.skill,
                    skill_info_url: skill.info_url,
                    skill_subcategory_id: subcategory.skill_subcategory_id
                }
            });
        }));
    });

    await Promise.all(skillsPromises);
    console.log(`${skillsCount} skills have been added.\n`);
}

async function seedJobSeekers() {
    const jobSeekers = await prisma.contacts.findMany({
        where: {
            role: 'JOBSEEKER',
        }
    });
    const pathways = await prisma.pathways.findMany({
        select: {
            pathway_id: true,
        }
    });
    const edInstitutions = await prisma.edu_institutions.findMany({
        select: {
            edu_institution_id: true,
        }
    });

    console.log('Seeding jobseekers...')
    for (const jobSeeker of jobSeekers) {
        const isEnrolledCollege = Math.random() < 0.6; // 60% chance of being enrolled in college.
        const jobSeekerData = {
            jobseeker_id: uuidv4(),
            user_id: jobSeeker.user_id,
            targeted_pathway: faker.helpers.arrayElement(pathways).pathway_id,
            edu_institution_id: faker.helpers.arrayElement(edInstitutions).edu_institution_id,
            is_enrolled_college: isEnrolledCollege ? 1 : 0,
            highest_level_of_study_completed: faker.helpers.arrayElement(['High School', 'Certificate', 'AAS', 'BAS', 'Boot Camp']),
            current_grade_level: faker.helpers.arrayElement(['freshman', 'sophomore', 'junior', 'senior']),
            current_enrolled_ed_program: isEnrolledCollege ? faker.helpers.arrayElement(techEdPrograms) : null,
            degree_type: null,
            intern_hours_required: isEnrolledCollege ? faker.number.int({min: 75, max: 300}) : 0,
            major: null,
            minor: null,
            intro_headline: generateSalesPitch(jobSeeker.first_name, jobSeeker.last_name),
            current_job_title: faker.person.jobTitle(),
            resume_url: null,
            years_work_exp: faker.number.int({min: 0, max: 3}), // years of experience
            portfolio_url: faker.internet.url(),
            video_url: faker.internet.url(),
            employment_type_sought: faker.helpers.arrayElement(['Full-time', 'Part-time', 'Internship', 'Contract', 'Any']),
        };

        await prisma.jobseekers.create({
            data: jobSeekerData,
        });
    }
    console.log(`Created ${jobSeekers.length} jobseekers.\n`)
}

async function seedJobSeekersPrivateData() {
    try {
        const jobseekers = await prisma.jobseekers.findMany();
        console.log('Seeding jobseeker private data...');

        for (const js of jobseekers) {
            await prisma.jobseekers_private_data.create({
                data: {
                    jobseeker_private_data_id: uuidv4(),
                    jobseeker_id: js.jobseeker_id,
                    ssn: generateSSN(),
                    is_authorized_to_work_in_usa: faker.number.int({ min: 0, max: 1 }),
                    job_sponsorship_required: faker.number.int({ min: 0, max: 1 }),
                    is_veteran: faker.number.int({ min: 0, max: 1 }),
                    has_disability: 'prefer not to say'
                }
            });
        }

        console.log(`Seeded ${jobseekers.length} entries for jobseeker private data.\n`);
    } catch (error) {
        console.error('Error seeding jobseeker private data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

async function seedJobSeekerSkills() {
    console.log(`Seeding Jobseeker skills...`);
    const jobseekers = await prisma.jobseekers.findMany();
    const skills = await prisma.skills.findMany();
    let skillCount = 0;

    for (const js of jobseekers) {
        const usedSkills = new Set();
        for (let i = 0; i < 5; i++) {
            let skill;

            do {
                skill = faker.helpers.arrayElement(skills);
            } while (usedSkills.has(skill.skill_id));

            usedSkills.add(skill.skill_id);

            await prisma.jobseeker_has_skills.create({
                data: {
                    jobseeker_id: js.jobseeker_id,
                    skill_id: skill.skill_id,
                },
            });
            skillCount++;
        }
    }
    console.log(`Seeded ${skillCount} Jobseeker skills.\n`);
}


async function seedWorkExperiences() {
    try {
        const jobseekers = await prisma.jobseekers.findMany();
        const techAreas = await prisma.technology_areas.findMany({
            select: {
                technology_area_id: true,
            }
        });
        console.log('Seeding work experiences...')
        let workExpCount = 0;
        const promises = jobseekers.map(js => {
            const workExperiencePromises = [];
            // Create two work experiences for each jobseeker
            for (let i = 0; i < 2; i++) {
                const startDate = faker.date.past({years: 5});
                const isCurrentJob = Math.random() < 0.2; // 20% chance of being current job

                workExperiencePromises.push(prisma.work_experiences.create({
                    data: {
                        work_id: uuidv4(),
                        jobseeker_id: js.jobseeker_id,
                        technology_area_id: faker.helpers.arrayElement(techAreas).technology_area_id,
                        company: faker.company.name(),
                        is_internship: faker.number.int({min: 0, max: 1}),
                        job_title: faker.person.jobTitle(),
                        is_current_job: isCurrentJob ? 1 : 0,
                        start_date: startDate,
                        end_date: isCurrentJob ? null : faker.date.between({from: startDate, to: new Date()}),
                        responsibilities: generateResponsibilities(faker.number.int({min: 3, max: 6})),
                    },
                }));
            }
            workExpCount += workExperiencePromises.length;
            return Promise.all(workExperiencePromises);
        });
        await Promise.all(promises);
        console.log(`Seeded ${workExpCount} work experiences.\n`)
    } catch (error) {
        console.error('Error seeding work experiences:', error);
    } finally {
        await prisma.$disconnect();
    }
}

async function seedProjectExperiences() {
    try {
        let projectCount = 0;
        const jobseekers = await prisma.jobseekers.findMany();
        console.log(`Seeding project experiences...`)
        const promises = jobseekers.map(js => {
            const projectExperiencePromises = [];

            // Create three project experiences for each jobseeker
            for (let i = 0; i < 3; i++) {
                const startDate = faker.date.past({years: 5});
                const completionDate = faker.date.between({from: startDate, to: new Date()});

                projectExperiencePromises.push(prisma.project_experiences.create({
                    data: {
                        proj_exp_id: uuidv4(),
                        jobseeker_id: js.jobseeker_id,
                        project_title: faker.helpers.arrayElement(itProjectTitles),
                        jobseeker_role: faker.helpers.arrayElement(developmentTeamRoles),
                        start_date: startDate,
                        completion_date: completionDate,
                        problem_solved_description:
                            generateProblemSolvedDescription(faker.number.int({min: 3, max: 12})),
                        team_size: faker.number.int({min: 3, max: 10}),
                        repo_url: faker.internet.url(),
                        demo_url: faker.internet.url(),
                    },
                }));
            }
            projectCount += projectExperiencePromises.length;
            return Promise.all(projectExperiencePromises);
        });
        console.log(`Seeded ${projectCount} project experiences.\n`)
        await Promise.all(promises);
    } catch (error) {
        console.error('Error seeding project experiences:', error);
    } finally {
        await prisma.$disconnect();
    }
}

async function seedProjectSkills() {
    console.log(`Seeding Project skills...`);
    const projects = await prisma.project_experiences.findMany();
    const skills = await prisma.skills.findMany();
    let skillCount = 0;

    for (const p of projects) {
        const usedSkills = new Set();
        for (let i = 0; i < 3; i++) {
            let skill;
            do {
                skill = faker.helpers.arrayElement(skills);
            } while (usedSkills.has(skill.skill_id));

            usedSkills.add(skill.skill_id);

            await prisma.project_has_skills.create({
                data: {
                    proj_exp_id: p.proj_exp_id,
                    skill_id: skill.skill_id,
                },
            });

            skillCount++;
        }
    }

    console.log(`Seeded ${skillCount} Project skills.\n`);
}

async function seedJobSeekerCertificates() {
    try {
        let certCount = 0;
        const jobseekers = await prisma.jobseekers.findMany();
        console.log(`Seeding jobseeker certificates...`)
        const promises = jobseekers.map(js => {
            const certificatePromises = [];
            // Create a copy of the certifications array
            const availableCertifications = [...itCertifications];

            // Create 3 certificates for each jobseeker
            for (let i = 0; i < 3; i++) {
                const issueDate = faker.date.past({years: 5});
                const expirationDate = faker.date.future({years: 2, refDate: issueDate});
                // Randomly select a certification and remove it from the available list
                const certificationIndex = faker.number.int({min: 0, max: availableCertifications.length - 1});
                const certification = availableCertifications.splice(certificationIndex, 1)[0];

                certificatePromises.push(prisma.certificates.create({
                    data: {
                        certification_id: uuidv4(),
                        jobseeker_id: js.jobseeker_id,
                        name: certification.name,
                        logo_url: certification.logo_url,
                        issuing_org: certification.issuing_org,
                        credential_id: certification.credential_id,
                        credential_url: certification.credential_url,
                        issue_date: issueDate,
                        expiration_date: expirationDate,
                    },
                }));
            }
            certCount += certificatePromises.length;
            return Promise.all(certificatePromises);
        });

        await Promise.all(promises);
        console.log(`Seeded ${certCount} jobseeker certificates.\n`)
    } catch (error) {
        console.error('Error seeding jobseeker certificates:', error);
    } finally {
        await prisma.$disconnect();
    }
}

////////////// Employer Data  ///////////////////

async function seedIndustrySectors() {
    console.log(`Seeding Industry Sectors...`)
    for (const sector of industrySectors) {
        await prisma.industry_sectors.create({
            data: {
                industry_sector_id: uuidv4(),
                sector_title: sector,
            },
        });
    }
    console.log(`Seeded ${industrySectors.length} Industry Sectors.\n`)
}

async function seedCompanies() {
    const sectors = await prisma.industry_sectors.findMany();
    for (let i = 0; i < 5; i++) {
        await prisma.companies.create({
            data: {
                company_id: uuidv4(),
                industry_sector_id: faker.helpers.arrayElement(sectors).industry_sector_id,
                company_name: faker.company.name(),
                company_logo_url: faker.internet.url(),
                description: faker.lorem.sentences(2),
                company_email: faker.internet.email(),
                year_founded: faker.number.int({min: 1900, max: 2024}),
                company_website_url: faker.internet.url(),
                company_video_url: faker.internet.url(),
                company_phone: generateE164PhoneNumber(),
                company_mission: faker.lorem.sentences(3),
                company_vision: faker.lorem.sentences(3),
                size: faker.number.int({min: 5, max: 1500}).toString(),
                predicted_annual_hires: faker.number.int({min: 1, max: 10})
            }
        });
    }
}

async function seedEmployers() {
    console.log(`Seeding Employers...`)
    const companies = await prisma.companies.findMany({
        select: {
            company_id: true,
        }
    });
    const employers = await prisma.contacts.findMany({
        where: {
            role: 'EMPLOYER',
        }
    });
    for(const e of employers) {
        const regionInfo = faker.helpers.arrayElement(waStateCountiesWithZipCodes);
        await prisma.employers.create({
            data: {
                employer_id: uuidv4(),
                user_id: e.user_id,
                company_id: faker.helpers.arrayElement(companies).company_id,
                job_title: faker.person.jobTitle(),
                home_office_location: faker.location.city() + ', WA ' + faker.helpers.arrayElement(regionInfo.zipCodes),
                employer_url: null,
                logo_url: null,
            }
        })
    }
    console.log(`Seeded ${employers.length} Employers.\n`)
}

async function seedCompanyAddresses() {
    const companies = await prisma.companies.findMany();
    for(const c of companies) {
        const regionInfo = faker.helpers.arrayElement(waStateCountiesWithZipCodes);
        await prisma.company_addresses.create({
            data: {
                company_address_id: uuidv4(),
                company_id: c.company_id,
                city: faker.location.city(),
                state: 'WA',
                zip_region: faker.helpers.arrayElement(regionInfo.zipCodes),
                county: regionInfo.county,
            },
        });

    }
}

async function seedCompanyTestimonials() {
    console.log(`Seeding Company Testimonials...`)
    let count = 0;
    const companies = await prisma.companies.findMany();
    for( const c of companies) {
        for(let i = 0; i < 3; i++) {
            await prisma.company_testimonials.create({
                data: {
                    testimonial_id: uuidv4(),
                    company_id: c.company_id,
                    text: faker.lorem.sentences(2),
                    author: faker.person.fullName(),
                }
            })
        }
        count++;
    }
    console.log(`Seeded ${count} Company Testimonials.\n`)
}

async function seedSocialMediaPlatforms() {
    console.log(`Seeding social media platforms...`);
    const socialPromises = socialMediaPlatforms.map(async platform => {
        await prisma.social_media_platforms.create({
            data: {
                social_platform_id: uuidv4(),
                platform: platform.platform,
                social_logo_url: platform.social_logo_url,
            }
        });
    });

    // Wait for all promises to complete
    await Promise.all(socialPromises);
    console.log(`Seeded ${socialPromises.length} social media platforms.\n`);
}

async function seedCompanySocialLinks() {
    console.log(`Seeding Company Social Links...`)
    const companies = await prisma.companies.findMany();
    const platforms = await prisma.social_media_platforms.findMany();
    let count = 0;
    for (const c of companies) {
        for (let i = 0; i < 3; i++) {
            let platform = platforms.pop();
            await prisma.company_social_links.create({
                data: {
                    social_media_id: uuidv4(),
                    company_id: c.company_id,
                    social_platform_id: platform.social_platform_id,
                    social_url: `https://www.${platform.platform.toLowerCase()}/${c.company_name.toLowerCase().replace(/[\s\W]/g, '')}`,
                }
            });
            count++;
        }
    }
    console.log(`Seeded ${count} Company Social Links.\n`)
}

async function seedJobPostings() {
    try {
        console.log(`Seeding Job Postings...`);
        const employers = await prisma.employers.findMany();
        const techArea = await prisma.technology_areas.findMany({
            select: {
                technology_area_id: true,
            }
        });

        let totalJobPostings = 0;
        for (const e of employers) {
            for (let i = 0; i < 3; i++) {
                try {
                    // 40% chance job post is an internship
                    const isInternship = Math.random() < 0.4;
                    // paid if not internship, internships have a 50% chance of being paid
                    const isPaid = !isInternship ? 1 : (Math.random() < 0.5 ? 1 : 0);
                    const regionInfo = waStateCountiesWithZipCodes[faker.number.int({ min: 0, max: waStateCountiesWithZipCodes.length - 1 })];
                    await prisma.job_postings.create({
                        data: {
                            job_posting_id: uuidv4(),
                            company_id: e.company_id,
                            employer_id: e.employer_id,
                            job_title: faker.helpers.arrayElement(itJobTitles),
                            job_description: faker.person.jobDescriptor(),
                            is_internship: isInternship ? 1 : 0,
                            is_paid: isPaid,
                            employment_type: faker.helpers.arrayElement(['full-time', 'part-time', 'contract']),
                            location: faker.helpers.arrayElement(['on-site', 'remote', 'hybrid']),
                            salary_range: isPaid > 0 ? generateCompensation(isInternship) : 'unpaid internship',
                            county: regionInfo.county,
                            zip: faker.helpers.arrayElement(regionInfo.zipCodes),
                            publish_date: faker.date.soon(),
                            unpublish_date: faker.date.future(),
                            job_post_url: faker.internet.url(),
                            assessment_url: faker.internet.url(),
                            technology_area_id: faker.helpers.arrayElement(techArea).technology_area_id,
                        }
                    });
                    totalJobPostings++; // Increment the total job postings counter
                } catch (innerError) {
                    console.error(`Error seeding job posting for employer ${e.employer_id}:`, innerError);
                }
            }
        }
        console.log(`Seeded ${totalJobPostings} Job Postings in total.\n`);
    } catch (error) {
        console.error('Error seeding job postings:', error);
        throw error; // Rethrow the error to be caught by the caller
    } finally {
        await prisma.$disconnect();
    }
}

/////////////////////////////////////////////////

async function main() {
    console.log(`Start seeding ...\n`);
    await seedPathways();
    await seedTechnologyAreas();
    await seedSubcategories();
    await seedSkills();
    await seedSocialMediaPlatforms();
    await seedContacts(100);
    await seedContactAddresses();
    await seedEduInstitutions();
    await SeedEduAddresses();
    await seedJobSeekers();
    await seedJobSeekersPrivateData();
    await seedJobSeekerSkills();
    await seedWorkExperiences();
    await seedJobSeekerCertificates();
    await seedProjectExperiences();
    await seedProjectSkills();
    // TODO: add self-assessments and associate with a pathway
    // TODO: add jobseeker self-assessment and info session questions
    // TODO: add pathway subcategories (i.e. Software Dev consists of Web Dev, Mobile Dev etc.)
    // TODO: associate skills with a pathway
    // Employer data
    await seedIndustrySectors();
    await seedCompanies();
    await seedCompanyAddresses();
    await seedCompanyTestimonials();
    await seedCompanySocialLinks();
    await seedEmployers();
    await seedJobPostings();
    console.log(`Finished seeding ...\n`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });