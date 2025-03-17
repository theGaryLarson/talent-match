import { SkillDTO } from "@/data/dtos/SkillDTO";
import { Chip, ChipProps, Grid2 } from "@mui/material";
import Link from "next/link";

export default function Skills({
  skillsList,
  maxNumSkills,
  jobseekerID,
  color = "primary",
}: {
  skillsList?: SkillDTO[];
  maxNumSkills: number;
  jobseekerID?: string;
  color?: ChipProps["color"];
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
        <Chip
          component={Link}
          clickable
          color={color}
          key={pill?.skill_id}
          label={pill?.skill_name}
          target="_blank"
          href={pill?.skill_info_url}
        />
      ))}
      {/* N-maxNumSkills link here */}
      {jobseekerID != null && leftoverSkillsCount > 0 ? (
        <Chip
          component={Link}
          clickable
          key={"leftoverSkills"}
          label={"+" + leftoverSkillsCount}
          href={"/services/jobseekers/" + jobseekerID + "#skills"}
        />
      ) : (
        ""
      )}
    </Grid2>
  );
}
