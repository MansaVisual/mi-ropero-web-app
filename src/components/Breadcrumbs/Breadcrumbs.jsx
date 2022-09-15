import React from "react";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Typography } from "@mui/material";
import Separator from "../../assets/img/Separator.svg";
import theme from "../../styles/theme";

const Breadcrumbs = ({ links }) => {
  return (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      separator={<img src={Separator} alt="" />}
    >
      {links.map((link, index) => {
        const last = index === links.length - 1;
        const to = `/${links.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography
            key={to}
            sx={{
              fontSize: theme.typography.fontSize[2],
              fontWeight: theme.typography.fontWeightRegular,
              textTransform: "uppercase",
              textDecoration: "none",
              color: theme.palette.quaternary.contrastText,
            }}
          >
            {link.replace(/%20/g, " ")}
          </Typography>
        ) : (
          <Link
            key={to}
            color="inherit"
            href={to}
            sx={{
              display: "flex",
              fontSize: theme.typography.fontSize[2],
              fontWeight: theme.typography.fontWeightRegular,
              textTransform: "uppercase",
              textDecoration: "none",
              color: theme.palette.quaternary.contrastText,
            }}
          >
            {link.replace(/%20/g, " ")}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
