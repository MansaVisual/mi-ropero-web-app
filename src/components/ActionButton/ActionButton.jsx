import React, { useState } from "react";

import { Box, Fab } from "@mui/material";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { IoArrowUndoSharp } from "react-icons/io5";

export const LikeButton = () => {
  const [like, setLike] = useState(null);

  const onLike = () => {
    setLike(!like);
  };

  return (
    <Box>
      <Fab
        color={!like ? "primary" : "secondary"}
        size="small"
        onClick={onLike}
        disableRipple
      >
        {!like ? (
          <AiOutlineHeart fontSize="23px" color="white" />
        ) : (
          <AiFillHeart fontSize="23px" color="white" />
        )}
      </Fab>
    </Box>
  );
};

export const UpButton = () => {
  return (
    <Box>
      <Fab
        size="small"
        sx={{ transform: "rotate(90deg)", backgroundColor: "#FFA6E1" }}
      >
        <IoArrowUndoSharp fontSize="26px" color="white" />
      </Fab>
    </Box>
  );
};

export const WspButton = () => {
  return (
    <Box>
      <Fab size="small" sx={{ backgroundColor: "#00BB2D" }}>
        <FaWhatsapp fontSize="26px" color="white" />
      </Fab>
    </Box>
  );
};
