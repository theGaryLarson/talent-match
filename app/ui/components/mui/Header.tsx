"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ChevronDownIcon from "@mui/icons-material/ArrowDropDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItemButton,
} from "@mui/material";

const pages = [
  "For Employers",
  "For Jobseekers",
  "Our Community",
  "Partners",
  "Events",
  "About Us",
];

const TopLevelLinks = [
  {
    name: "For Employers",
    dropDowns: [
      { name: "Landing Page", href: "/services/employers" },
      { name: "Talent Showcase", href: "/services/talent-search" },
    ],
  },
  {
    name: "For Jobseekers",
    dropDowns: [
      { name: "Landing Page", href: "/services/jobseekers" },
      { name: "Job Listings", href: "/services/joblistings" },
    ],
  },
  {
    name: "Our Community",
    dropDowns: [
      {
        name: "Join Our Community",
        href: "https://forum.watechwfcoalition.org/",
        target: "_blank",
        rel: "noopener noreferrer",
      },
      {
        name: "Careers",
        href: "/services/careers",
      },
    ],
  },
  {
    name: "Partners",
    dropDowns: [
      {
        name: "Training Providers",
        href: "/services/training-providers",
      },
    ],
  },
  { name: "Events", href: "/services/events" },
  { name: "About Us", href: "/about-us" },
] as Array<{
  name: string;
  href: string;
  target?: string;
  rel?: string;
  dropDowns?: Array<{
    name: string;
    href: string;
    target?: string;
    rel?: string;
  }>;
}>;

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // toggle the mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const [anchorEl, setAnchorEl] = useState<{
    [key: string]: HTMLElement | null;
  }>({});

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    linkName: string,
  ) => {
    setAnchorEl((prev) => ({ ...prev, [linkName]: event.currentTarget }));
  };

  const handleCloseMenu = (linkName: string) => {
    setAnchorEl((prev) => ({ ...prev, [linkName]: null }));
  };
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pathname = usePathname();

  return (
    <AppBar position="static" color="inherit">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ px: 1, py: 1, gap: 4 }}>
          {pathname == "/services/jobseekers" ||
          pathname == "/services/employers" ||
          pathname.startsWith("/services/training-programs/") ? (
            <Link href="/">
              <span className="sr-only">Tech Workforce Coalition</span>
              <Image
                src="/images/TWC logo_White.svg"
                alt="Tech Workforce Coalition"
                width={75}
                height={31.8}
              />
            </Link>
          ) : (
            <Link href="/">
              <span className="sr-only">Tech Workforce Coalition</span>
              <Image
                src="/images/TWC_75x50_2024.svg"
                alt="Tech Workforce Coalition"
                width={75}
                height={31.8}
              />
            </Link>
          )}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <List sx={{ width: "100%" }}>
                {TopLevelLinks.map((link) => {
                  if (link.dropDowns) {
                    return (
                      <Accordion
                        key={link.name}
                        sx={{ boxShadow: "none", background: "transparent" }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          sx={{
                            px: 2,
                            py: 1,
                            fontWeight: "bold",
                            "&:hover": { bgcolor: "grey.100" },
                          }}
                        >
                          <Typography>{link.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 0 }}>
                          <List disablePadding>
                            {link.dropDowns.map((item) => (
                              <ListItemButton
                                key={item.name}
                                component={Link}
                                href={item.href}
                                target={item.target ?? "_self"}
                                rel={item.rel || ""}
                                sx={{ pl: 4, py: 1, fontSize: "0.9rem" }}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {item.name}
                              </ListItemButton>
                            ))}
                          </List>
                        </AccordionDetails>
                      </Accordion>
                    );
                  }

                  return (
                    <ListItemButton
                      key={link.name}
                      component={Link}
                      href={link.href}
                      target={link?.target ?? "_self"}
                      rel={link?.rel ?? ""}
                      sx={{
                        px: 2,
                        py: 1.5,
                        fontWeight: "bold",
                        "&:hover": { bgcolor: "grey.100" },
                      }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </ListItemButton>
                  );
                })}
              </List>
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center", // Ensures items are centered
              gap: { md: 3 }, // Adds spacing between items on "tablet" screens and larger
            }}
          >
            {TopLevelLinks.map((link) => {
              if (link.dropDowns) {
                return (
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: { xs: "none", md: "flex" },
                      justifyContent: "center",
                      alignItems: "center",
                      gap: { md: 3 },
                    }}
                    key={link.name}
                  >
                    <Button
                      endIcon={<ChevronDownIcon />}
                      onClick={(event) => handleOpenMenu(event, link.name)}
                      sx={{ color: "inherit", fontWeight: 600 }}
                    >
                      {link.name}
                    </Button>

                    <Menu
                      anchorEl={anchorEl[link.name]}
                      open={Boolean(anchorEl[link.name])}
                      onClose={() => handleCloseMenu(link.name)}
                      MenuListProps={{
                        onMouseLeave: () => handleCloseMenu(link.name),
                      }}
                      sx={{ mt: 1 }}
                    >
                      {link.dropDowns.map((item) => (
                        <MenuItem
                          key={item.name}
                          onClick={() => handleCloseMenu(link.name)}
                        >
                          <Link
                            href={item.href}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {item.name}
                          </Link>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                );
              }
              return (
                <Button
                  key={link.name}
                  sx={{ color: "inherit", fontWeight: 600 }}
                >
                  <Link
                    href={link.href}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {link.name}
                  </Link>
                </Button>
              );
            })}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* {TopLevelLinks.map((link) => {
            if (link.dropDowns) {
              return (
                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                    justifyContent: "center",
                    alignItems: "center", // Ensures items are centered
                    gap: { md: 3 }, // Adds spacing between items on "tablet" screens and larger
                  }}
                  key={link.name}
                >
                  <Button
                    endIcon={<ChevronDownIcon />}
                    onClick={(event) => handleOpenMenu(event, link.name)}
                    sx={{ color: "inherit", fontWeight: 600 }}
                  >
                    {link.name}
                  </Button>

                  <Menu
                    anchorEl={anchorEl[link.name]}
                    open={Boolean(anchorEl[link.name])}
                    onClose={() => handleCloseMenu(link.name)}
                    MenuListProps={{
                      onMouseLeave: () => handleCloseMenu(link.name),
                    }}
                    sx={{ mt: 1 }}
                  >
                    {link.dropDowns.map((item) => (
                      <MenuItem
                        key={item.name}
                        onClick={() => handleCloseMenu(link.name)}
                      >
                        <Link
                          href={item.href}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {item.name}
                        </Link>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              );
            }
            return (
              <Button
                key={link.name}
                sx={{ color: "inherit", fontWeight: 600 }}
              >
                <Link
                  href={link.href}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {link.name}
                </Link>
              </Button>
            );
          })} */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
