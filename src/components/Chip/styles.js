import { Box, styled } from "@mui/material";

export const StyledChip = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  borderRadius: "100px",
  whiteSpace: "nowrap",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  margin: "0 auto",
}));
