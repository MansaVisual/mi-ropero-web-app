import { Link,Button, styled } from "@mui/material";

export const StyledLink = styled(Link)(({theme}) => ({
    color: theme.palette.secondary.contrastText,
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: theme.typography.fontSize[3],
}))

export const SocialButton = styled(Button)(({theme}) => ({
    boxSizing: 'border-box',
    backgroundColor: 'rgba(246, 248, 249, 0.05)',
    border: '0.25px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '5px',
    color: 'white',
    minWidth: 0,
    height: '34px',
    width: '34px'
}))