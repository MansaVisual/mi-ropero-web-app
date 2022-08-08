import { Link,Button, styled } from "@mui/material";

export const StyledLink = styled(Link)(({theme}) => ({
    color: theme.palette.secondary.contrastText,
    textDecoration: 'none',
    cursor: 'pointer',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize[3],
}))

export const SocialButton = styled(Button)(({theme}) => ({
    boxSizing: 'border-box',
    backgroundColor: 'rgba(246, 248, 249, 0.05)',
    border: '0.25px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.25), -2px -2px 8px rgba(246, 248, 249, 0.1)',
    borderRadius: '5px',
    color: 'white',
    minWidth: 0,
    height: '34px',
    width: '34px'
}))