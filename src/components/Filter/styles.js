import { ListItemButton, styled } from "@mui/material";

export const ListItemStyled = styled((props) => <ListItemButton {...props} />)(
  ({ theme }) => ({
    paddingTop: "16px",
    paddingBottom: "16px",
    paddingLeft: 0,
  })
);
