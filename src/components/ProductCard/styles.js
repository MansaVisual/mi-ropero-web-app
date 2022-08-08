import { Box, styled } from "@mui/material";

export const TagNewStyled = styled(Box)(({ theme }) => ({
  fontSize: theme.typography.fontSize[1],
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: '14.98px',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  borderRadius: "0px 10px 0px 0px",
  padding: "4px 15px 4px 15px",
  position: 'absolute',
  bottom: '152px'
}));