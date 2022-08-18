import React from "react";
import { styled, Tab, Tabs } from "@mui/material";

export const AntTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "hsla(0, 0%, 100%, 1)",
    bottom: "4px",
  },
});

export const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    letterSpacing: "0.8px",
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("xs")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    fontFamily: theme.typography.fontFamily,
    lineHeight: "19.07px",
    fontSize: theme.typography.fontSize[4],
    color: "hsla(0, 0%, 100%, 1)",
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "hsla(0, 0%, 100%, 1)",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
    "&.MuiButtonBase-root": {
      padding: "12px 28px",
    },
  })
);
