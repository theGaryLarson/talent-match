import { SkillDTO } from "@/data/dtos/SkillDTO";
import Pill from "./Pill";

export default function Skills({ skillsList, maxNumSkills, jobseekerID }: {
    skillsList?: SkillDTO[];
    maxNumSkills: number;
    jobseekerID?: string;
}) {

    if (skillsList == null || skillsList.length == 0) return;

    var leftoverSkillsCount = 0;
    if (maxNumSkills != 0 // 0 indicates show all skills
        && skillsList.length > maxNumSkills + 1) { // avoid a leftover of "+1" skill
            leftoverSkillsCount = skillsList.length - maxNumSkills;
            skillsList = skillsList.slice(0, maxNumSkills);
    }

    return (
        <div className="space-x-2">
            {skillsList.map((pill) => (
                <Pill
                    key={pill?.skill_id}
                    text={pill?.skill_name}
                    href={pill?.skill_info_url}
                    grayscale={false}
                />
            ))}
            {/* N-maxNumSkills link here */}
            {jobseekerID != null && leftoverSkillsCount > 0 ?
                <Pill
                    key={"leftoverSkills"}
                    text={"+" + leftoverSkillsCount}
                    href={'/services/jobseekers/' + jobseekerID}
                    grayscale={true}
                />
                : ""
            }
        </div>
    );
}