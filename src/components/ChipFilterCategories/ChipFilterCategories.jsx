import { Box, Chip, ListItem } from "@mui/material";
import React, { useState } from "react";
import theme from "../../styles/theme";

const ChipFilterCategories = () => {
  const [chipData, setChipData] = useState([
    { key: 0, label: "Calzado" },
    { key: 1, label: "Color Negro" },
    { key: 2, label: "Nuevo" },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {chipData.map((data) => {
        return (
          <ListItem
            key={data.key}
            sx={{
              "&.MuiListItem-root": {
                px: 0,
              },
            }}
          >
            <Chip
              label={data.label}
              onDelete={(data) => handleDelete(data)}
              sx={{
                backgroundColor: "hsla(248, 84%, 93%, 1)",
                color: "hsla(351, 6%, 25%, 1)",
                fontSize: theme.typography.fontSize[2],
                fontWeight: theme.typography.fontWeightRegular,
              }}
            />
          </ListItem>
        );
      })}
    </Box>
  );
};

export default ChipFilterCategories;
