import { ListItemButton, styled } from "@mui/material";
import theme from "../../styles/theme";

export const ListItemStyled = styled((props) => <ListItemButton {...props} />)(
  ({ theme }) => ({
    padding: "16px",
  })
);

export const ListItemTextStyled = {
  "& .MuiTypography-root": {
    fontSize: theme.typography.fontSize[4],
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.quaternary.contrastText,
  },
};

export const ListItemPriceRangeStyled = {
  "& .MuiTypography-root": {
    fontSize: theme.typography.fontSize[4],
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.quaternary.contrastText,
    mb: "18px",
  },
};

export const FormControlLabelStyled = {
  "& .MuiTypography-root": {
    fontSize: theme.typography.fontSize[3],
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.quaternary.contrastText,
  },
  "&.MuiFormControlLabel-root": {
    marginLeft: 0,
  },
};
