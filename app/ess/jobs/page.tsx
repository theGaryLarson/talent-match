import { Container, Box, Typography, FormControl, Grid2, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import JobCard from "../ui/job-card";

export default function Page() {
    return (
        <Container maxWidth="xl" sx={{ marginBottom: 4 }}>
            <TextField
                label={"Search by title, skill, or field"}
                id="filled-hidden-label-small"
                fullWidth
            />
            <Grid2 container marginBottom={2}>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Education</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={0}
                        label="High School / GED"
                    >
                        <MenuItem value="">
                            <em>High School / GED</em>
                        </MenuItem>
                        <MenuItem value={10}>Associate</MenuItem>
                        <MenuItem value={20}>Bachelor</MenuItem>
                        <MenuItem value={30}>Master</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-lab2el">Years of Experience</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-2label"
                        id="demo-simple-select-st2andard"
                        value={0}
                        label="Age"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Less than a year</MenuItem>
                        <MenuItem value={20}>1+ years</MenuItem>
                        <MenuItem value={30}>3+ years</MenuItem>
                    </Select>
                </FormControl>
            </Grid2>
            <Grid2 container spacing={2}>
                <JobCard job={{ cfa_name: "Job title", cfa_whattheydo: "Job Description", cfa_occupationid: '1234' }} />
                <JobCard job={{ cfa_name: "Job title", cfa_whattheydo: "Job Description", cfa_occupationid: '1234' }} />
                <JobCard job={{ cfa_name: "Job title", cfa_whattheydo: "Job Description", cfa_occupationid: '1234' }} />
                <JobCard job={{ cfa_name: "Job title", cfa_whattheydo: "Job Description", cfa_occupationid: '1234' }} />
            </Grid2>
        </Container>
    );
}
