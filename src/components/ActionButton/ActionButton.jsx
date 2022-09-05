import React, { useState } from "react";
import { Box, Fab } from "@mui/material";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { IoArrowUndoSharp } from "react-icons/io5";
import { FaRegCommentAlt } from "react-icons/fa";

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
          <AiOutlineHeart fontSize="23px" color="hsl(0, 0%, 100%)" />
        ) : (
          <AiFillHeart fontSize="23px" color="hsl(0, 0%, 100%)" />
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
        sx={{
          transform: "rotate(90deg)",
          backgroundColor: "hsl(320.2, 100%, 82.5%)",
        }}
      >
        <IoArrowUndoSharp fontSize="26px" color="hsl(0, 0%, 100%)" />
      </Fab>
    </Box>
  );
};

export const WspButton = () => {
  return (
    <Box>
      <Fab size="small" sx={{ backgroundColor: "hsl(134.4, 100%, 36.7%)" }}>
        <FaWhatsapp fontSize="26px" color="hsl(0, 0%, 100%)" />
      </Fab>
    </Box>
  );
};

export const CommentButton = () => {
  return (
    <Box>
      <Fab size="small" sx={{ backgroundColor: "hsla(248, 41%, 38%, 1)" }}>
        <FaRegCommentAlt fontSize="19px" color="hsl(0, 0%, 100%)" />
      </Fab>
    </Box>
  );
};
