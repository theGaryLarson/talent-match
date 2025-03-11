"use client";
import PillButton from "@/app/ui/components/PillButton";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  /*const { data: session, status } = useSession();
  const durableSkillsStoreData = useSelector(
    (state: RootState) => state.jobseeker.durableSkills,
  );*/
  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <PillButton
          variant="outlined"
          onClick={() => {
            router.push("/edit-profile/jobseeker/technical-skills");
          }}
        >
          Previous
        </PillButton>
        <PillButton type="submit">Submit</PillButton>
      </Stack>
    </Box>
  );
}
