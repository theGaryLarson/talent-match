import CareerPage from "@/app/ui/components/CareerPage";

export default function Page() {
    return (
        <CareerPage
            title={"IT/Cloud Support"}
            subtitle={"Keep systems running smoothly and securely"}
            img={"/images/careers/it-cloud-support.jpg"}
            altCareerNames={"IT Support Specialist, Technical Support Engineer, Cloud Support Engineer, Systems Administrator, Service Desk Analyst, Network Support Specialist, Desktop Support Technician, Customer Support Engineer, IT Operations Analyst, Cloud Infrastructure Engineer, DevOps Support Engineer, Cloud Solutions Specialist, Platform Support Specialist"}
            avgSalary={"$100K/year"}
            trainingLength={"1 - 2 Years"}
            prepLevel={"Medium"}

            description={"IT/Cloud Support Specialists maintain IT infrastructure, resolve technical issues, and manage cloud solutions. They ensure that systems run smoothly and securely, enabling teams to work efficiently across an organization."}
            whatYoullDo={"Troubleshoot and maintain IT infrastructure, support cloud solutions, and resolve technical issues for users"}
            skillsYoullNeed={"Knowledge of cloud platforms, troubleshooting skills, and a problem-solving mindset"}
            whyItMatters={"You’ll ensure seamless operations, empowering teams to work efficiently and securely"}

            tableAvgSalary={"$X,000 per year (national average)"}
            tableEduLevel={"Bachelor’s Degree or relevant experience"}
            tableExpReq={"0–2 years entry-level, 3–5 years mid-level"}
            tableJobGrowth={"Projected X% growth (next 5 years)"}

            trainingPrograms={"test"}
        />
    );
}