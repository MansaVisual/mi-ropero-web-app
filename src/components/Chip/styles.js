import { Box, styled } from "@mui/material";

export const StyledChip = styled(Box)(({ theme }) => ({
  fontSize: theme.typography.fontSize[9],
  borderRadius: '100px',
  height: "40px",
  display: 'inline-block',
}));
