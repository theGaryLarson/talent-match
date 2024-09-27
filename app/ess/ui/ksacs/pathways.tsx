"use client"

import placeholder_image from "../../../public/placeholder.jpg";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { useEffect, useState } from "react";
import { fetchPathways } from "../../api/api";
import { IPathway } from "../../lib/data";
import { Grid2, Avatar, Box, Button, Card, CardActionArea, CardContent, List, Stack, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";


export default function Pathways() {
    const { instance, accounts, inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const [pathwaysData, setpathwaysData] = useState<IPathway[]>([]);
    const router = useRouter();
    const theme = useTheme();

    useEffect(() => {
        const fetchPathwaysFromApi = async () => {
            try {
                if (isAuthenticated && accounts.length > 0) {
                    const result = await fetchPathways();
                    if (result.value.length > 0) {
                        setpathwaysData(result.value);
                        console.log(result.value);
                    }
                } else if (inProgress === InteractionStatus.None) {
                    await instance.loginRedirect();
                }
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchPathwaysFromApi();
    }, [accounts, instance, inProgress, isAuthenticated]);


    return (
        <>
            <Grid2 container>
                {pathwaysData && pathwaysData.map((pathway, index) => (
                    <Grid2 size={6} key={index}>
                        <Typography>{pathway.cfa_name}</Typography>
                    </Grid2>
                ))}
            </Grid2>
        </>
    );
}
