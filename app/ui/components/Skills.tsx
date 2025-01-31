import { SkillDTO } from "@/data/dtos/SkillDTO";
import Pill from "./Pill";
import { Grid2 } from "@mui/material";

export default function Skills({
  skillsList,
  maxNumSkills,
  jobseekerID,
}: {
  skillsList?: SkillDTO[];
  maxNumSkills: number;
  jobseekerID?: string;
}) {
  if (skillsList == null || skillsList.length == 0) return;

  let leftoverSkillsCount = 0;
  if (
    maxNumSkills != 0 && // 0 indicates show all skills
    skillsList.length > maxNumSkills
  ) {
    // avoid a leftover of "+1" skill
    leftoverSkillsCount = skillsList.length - maxNumSkills + 1;
    skillsList = skillsList.slice(0, maxNumSkills - 1);
  }

  return (
    <Grid2 container gap={1}>
      {skillsList.map((pill) => (
        <Pill
          key={pill?.skill_id}
          text={pill?.skill_name}
          href={pill?.skill_info_url}
          grayscale={false}
        />
      ))}
      {/* N-maxNumSkills link here */}
      {jobseekerID != null && leftoverSkillsCount > 0 ? (
        <Pill
          key={"leftoverSkills"}
          text={"+" + leftoverSkillsCount}
          href={"/services/jobseekers/" + jobseekerID + "#skills"}
          grayscale={true}
        />
      ) : (
        ""
      )}
    </Grid2>
  );
}
