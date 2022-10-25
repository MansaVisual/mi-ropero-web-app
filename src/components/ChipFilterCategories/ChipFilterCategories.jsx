import React from "react";
import { Chip, ListItem } from "@mui/material";
import theme from "../../styles/theme";

const ChipFilterCategories = ({ filteredCategory, key, putFilters,setPutFilters }) => {
  const handleDelete = () => {
    let newArrayId = putFilters.filter(
      (element) => element.id !== filteredCategory.id
    );
    setPutFilters(newArrayId)
  };

  return (
    <ListItem
      sx={{
        "&.MuiListItem-root": {
          px: 0,
        },
        width: "fit-content",
      }}
    >
      <Chip
        label={filteredCategory.nombre}
        onDelete={() => handleDelete()}
        sx={{
          backgroundColor: "hsla(248, 84%, 93%, 1)",
          color: "hsla(351, 6%, 25%, 1)",
          fontSize: theme.typography.fontSize[2],
          fontWeight: theme.typography.fontWeightRegular,
        }}
      />
    </ListItem>
  );
};

export default ChipFilterCategories;
