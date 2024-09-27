"use client"
import { Button, Typography } from "@mui/material";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/ess" },
  { name: "Pathways", href: "/ess/pathways" },
  { name: "CFA Job Board", href: "https://cfajobs.powerappsportals.com/" },
  /*{ name: "KSACs", href: "/ksacs" },*/
];

interface NavLinksProps {
  onLinkClick?: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export default function NavLinks({ onLinkClick }: NavLinksProps) {
  const pathName = usePathname();
  return (
    <>
      {links.map((link) => {
        const isActive = pathName === link.href;
        return (
          <Button
            component={NextLink}
            key={link.name}
            href={link.href}
            sx={{ backgroundColor: isActive ? 'accent.main' : '', display: "flex", alignItems: "center", justifyContent: "center", padding: 3, fontWeight: 500 }}
            onClick={onLinkClick}
          >
            <Typography m={0} sx={{ color: isActive ? 'text.primary' : 'primary.main', }}>
              {link.name}
            </Typography>
          </Button>
        );
      })}
    </>
  );
}
