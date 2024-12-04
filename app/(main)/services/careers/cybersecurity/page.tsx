import { EduProviderPathways } from "@/app/lib/eduProviders";
import CareerPage from "@/app/ui/components/career/CareerPage";

export default function Page() {
    return (
        <CareerPage
            title={"Cybersecurity"}
            subtitle={"Protect data and defend against digital threats"}
            img={"/images/careers/cybersecurity.jpg"}
            altCareerNames={"Security Analyst, SOC Analyst, Cybersecurity Engineer, Security Engineer, Penetration Tester, Threat Analyst, Incident Response Analyst, Security Architect, Cloud Security Engineer, IAM Specialist"}
            avgSalary={"$100K/year"}
            trainingLength={"1 - 2 Years"}
            prepLevel={"Medium"}

            description={"Cybersecurity Specialists protect systems, networks, and data from potential threats. Their work includes monitoring for security risks, implementing safeguards, and ensuring sensitive information stays secure."}
            whatYoullDo={"Secure systems, monitor for vulnerabilities, and develop strategies to counter cyber risks"}
            skillsYoullNeed={"Understanding of security protocols, risk management, and proficiency in tools like firewalls and encryption"}
            whyItMatters={"Your work will safeguard sensitive information, helping organizations and users stay safe online"}

            tableAvgSalary={"$X,000 per year (national average)"}
            tableEduLevel={"Bachelor’s Degree or relevant experience"}
            tableExpReq={"0–2 years entry-level, 3–5 years mid-level"}
            tableJobGrowth={"Projected X% growth (next 5 years)"}

            trainingPrograms={EduProviderPathways.Cybersecurity}
        />
    );
}