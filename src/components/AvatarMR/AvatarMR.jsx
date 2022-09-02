import React from "react";
import { Avatar, Box, Rating, Typography } from "@mui/material";
import theme from "../../styles/theme";

const AvatarMR = ({ imgAvatar, avatarCard, avatarRopero }) => {
  return (
    <Box sx={{ fontFamily: theme.typography.fontFamily }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          sx={{
            height: avatarRopero ? "40px" : "32px",
            width: avatarRopero ? "40px" : "32px",
            backgroundColor: "red",
            filter: avatarCard
              ? "drop-shadow(0px 4px 4px rgba(0,0,0,0.25))"
              : null,
            margin: 0,
          }}
          src={imgAvatar}
        >
          DB
        </Avatar>
        <Box sx={{ pl: !avatarCard ? "6px" : "10px" }}>
          {!avatarCard ? (
            <Typography sx={{ lineHeight: "16.34px", fontSize: "12px" }}>
              HOLA!
            </Typography>
          ) : null}
          <Typography
            sx={{
              fontSize: "11px",
              color: "hsla(0, 0%, 53%, 1)",
              lineHeight: !avatarCard ? "14.98px" : "20px",
              fontWeight: theme.typography.fontWeightMedium,
            }}
          >
            Dami Bass
          </Typography>
          {avatarCard ? (
            <Rating name="read-only" readOnly value={1} size="small" />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default AvatarMR;
