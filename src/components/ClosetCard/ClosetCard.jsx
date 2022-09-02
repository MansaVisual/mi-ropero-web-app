import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Rating,
  Typography,
} from "@mui/material";
import { AiOutlineHeart } from "react-icons/ai";
import theme from "../../styles/theme";

const ClosetCard = () => {
  return (
    <Card sx={{ maxWidth: 296, mb: "16px" }}>
      <CardContent
        sx={{
          height: "56px",
          backgroundColor: "hsl(0, 0%, 98.4%)",
          display: "flex",
          alignItems: "center",
          p: "10px",
          paddingBottom: "10px",
          "&:last-child": {
            paddingBottom: "10px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{ maxWidth: "230px", display: "flex", alignItems: "center" }}
          >
            <Box sx={{ mr: "8px" }}>🥇</Box>
            <Avatar
              sx={{
                mr: "8px",
                fontSize: theme.typography.fontSize[2],
                backgroundColor: theme.palette.secondary.main,
                width: "32px",
                height: "32px",
              }}
            >
              SG
            </Avatar>
            <Box>
              <Typography
                sx={{
                  fontSize: theme.typography.fontSize[2],
                  fontWeight: theme.typography.fontWeightRegular,
                }}
              >
                Sabrina Gomez
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    fontSize: theme.typography.fontSize[1],
                    fontWeight: theme.typography.fontWeightRegular,
                    color: theme.palette.tertiary.main,
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    mr: "5px",
                  }}
                >
                  142 productos
                </Typography>
                <Rating name="read-only" readOnly value={1} size="small" />
              </Box>
            </Box>
          </Box>

          <Box sx={{ ml: "20px" }}>
            <CardActionArea>
              <AiOutlineHeart size="24px" color={theme.palette.primary.main} />
            </CardActionArea>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClosetCard;
