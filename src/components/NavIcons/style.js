import { styled, Badge, Menu } from "@mui/material";

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    padding: "0px 3px",
    borderRadius: "3px",
    minWidth: "13.47px",
    height: "13.47px",
    fontSize: "10px",
    fontFamily: theme.typography.fontFamily,
    lineHeight: "14px",
    display: "flex",
    alignItems: "center",
  },
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "10px",
    marginTop: "20px",
    minWidth: '260px',
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
  },
}));
