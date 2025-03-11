"use client";
import PillButton from "@/app/ui/components/PillButton";
import { RootState } from "@/lib/jobseekerStore";
import { Box, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Page() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const durableSkillsStoreData = useSelector(
      (state: RootState) => state.jobseeker.durableSkills,
    );
    return (
        <Box>
            <Stack direction="row" sx={{justifyContent: "space-between"}}>
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