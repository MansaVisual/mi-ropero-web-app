import React from "react";
import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import Button from "../Button/Button";
import theme from "../../styles/theme";

const FloatingCardMobile = () => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflowX: "hidden",
        minWidth: "344px",
        width: "100%",
        minHeight: "56px",
      }}
    >
      <CardContent
        sx={{
          maxWidth: "180px",
        }}
      >
        <Typography
          component="h4"
          sx={{
            fontSize: theme.typography.fontSize[3],
            fontWeight: theme.typography.fontWeightRegular,
            color: theme.palette.quaternary.contrastText,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          Campera deportiva Adicolor Colorblock 2022 Ed. limitada
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontSize: theme.typography.fontSize[3],
              fontWeight: theme.typography.fontWeightMedium,
              color: theme.palette.quaternary.contrastText,
            }}
          >
            $23.799,00
          </Typography>
          <Typography
            component="del"
            sx={{
              fontSize: theme.typography.fontSize[2],
              color: theme.palette.tertiary.main,
            }}
          >
            $26.799
          </Typography>
          <Box
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
              textAlign: "center",
              borderRadius: "2px",
              minWidth: "48px",
              minHeight: "13px",
            }}
          >
            <Typography
              sx={{
                fontSize: theme.typography.fontSize[0],
                fontWeight: theme.typography.fontWeightMedium,
              }}
            >
              10% OFF
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          text="Comprar"
          backgroundColor="hsla(59, 100%, 60%, 1)"
          color="hsla(351, 6%, 25%, 1)"
          medium
        />
      </CardActions>
    </Card>
  );
};

export default FloatingCardMobile;
