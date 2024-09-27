import {
    Card,
    CardContent,
    Container,
    Typography,
    Box,
    SelectChangeEvent,
    Button,
    Grid2,
    List,
    ListItem,
    ListItemText,
    LinearProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Pathways from "../ui/ksacs/pathways";

export default function Page() {
    return (
        <>
            {
                <Container maxWidth="xl">
                    <Pathways />
                </Container>
            }
        </>
    );
}
