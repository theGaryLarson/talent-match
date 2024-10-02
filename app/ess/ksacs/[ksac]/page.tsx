import {
    Container,
    Typography,
    Box,
    Grid2,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    Select,
    MenuItem,
    FormControl,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { ksac: string } }) {
    console.log(params);
    return (
        <>
            {
                <Container maxWidth="xl">
                    <Typography variant="h4">Computer and Information Analysts</Typography>
                    <Typography sx={{ mb: 2 }}>Explore Knowledge, Skills, Abilities, and Credentials (KSACs) by IT Pathway.</Typography>
                    <TableContainer component={Paper} sx={{ mb: 2 }}>
                        <FormControl fullWidth>
                            <Select
                                id="category-selector"
                                value={20}
                                fullWidth
                            >
                                <MenuItem value={20}>IT Fundamentals</MenuItem>
                                <MenuItem value={21}>Networking Fundamentals</MenuItem>
                                <MenuItem value={22}>Programming/Scripting Fundamentals</MenuItem>
                            </Select>
                        </FormControl>
                        <Table>
                            <TableHead>
                                {/* mapping can happen here */}
                                <TableRow>
                                    <TableCell>Label</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Taxonomy Level</TableCell>
                                    <TableCell>Cross-Cutting</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* mapping can happen here */}
                                <TableRow>
                                    <TableCell align="center">a</TableCell>
                                    <TableCell>Recognize the importance that cybersecurity plays in managing information and systems, and demonstrate an understanding of the way systems are vulnerable and can be manipulated.</TableCell>
                                    <TableCell>Knowledge</TableCell>
                                    <TableCell>3</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography variant="h6">
                        Credentials
                    </Typography>
                    <Grid2 container component={Paper} sx={{ padding: 1 }}>
                        <Grid2 container size={{ sm: 6, md: 4 }}>
                            <Box>
                                <Typography sx={{ mb: 1 }}>
                                    Entry-level
                                </Typography>
                                <Grid2 container gap={1}>
                                    <Chip label="Security+" />
                                    <Chip label="Network+" />
                                    <Chip label="Cloud+" />
                                    <Chip label="CEH" />
                                    <Chip label="GSEC" />
                                    <Chip label="CAP" />
                                </Grid2>
                            </Box>
                        </Grid2>
                        <Grid2 container size={{ sm: 6, md: 4 }}>
                            <Box>
                                <Typography sx={{ mb: 1 }}>
                                    Mid-level
                                </Typography>
                                <Grid2 container gap={1}>
                                    <Chip label="CCNA" />
                                    <Chip label="CYSA+" />
                                </Grid2>
                            </Box>
                        </Grid2>
                        <Grid2 container size={{ sm: 6, md: 4 }}>
                            <Box>
                                <Typography sx={{ mb: 1 }}>
                                    Advanced-level
                                </Typography>
                                <Grid2 container gap={1}>
                                    <Chip label="CASP" />
                                    <Chip label="CISSP" />
                                    <Chip label="CISA" />
                                    <Chip label="CISM" />
                                    <Chip label="CRISC" />
                                    <Chip label="CCSP" />
                                </Grid2>
                            </Box>
                        </Grid2>
                    </Grid2>
                </Container>
            }
        </>
    );
}
