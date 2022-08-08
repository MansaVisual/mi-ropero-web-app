import { styled, InputBase } from "@mui/material"

export const StyledInput = styled(InputBase)(({ theme }) => ({
    borderRadius: '20px',
    border: '1px solid #E5E6E7',
    backgroundColor: theme.palette.common.white,
    height: '32px',
    width:'100%',
    paddingLeft: '18px',
    flex: 1,
    fontSize: theme.typography.fontSize[2],
    fontFamily: theme.typography.fontFamily,
    lineHeight: '16px',
}))