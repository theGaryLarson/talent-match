"use client";
import { Box, IconButton, Drawer, List, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import NavLinks from "./nav-links";

export default function Nav() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box display={"flex"} flexGrow={1} flexDirection={"row"}>
      {isSmallScreen ? (
        <>
          <Box height={"auto"} flexGrow={1} display={"block"} />
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            <List>
              <NavLinks onLinkClick={toggleDrawer(false)} />
            </List>
          </Drawer>
        </>
      ) : (
        <NavLinks />
      )}
    </Box>
  );
}
