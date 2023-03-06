import React, { useState } from "react";
import {  styled } from '@stitches/react';
import { TrashIcon } from "@radix-ui/react-icons";
import Box from "../Box";

type DeleteTaskControlProps = {
  onDelete: () => void
}

const StyledDeleteIcon = styled('div', {

  display: "flex", 
  alignItems: "center",
  padding: "4px",
  borderRadius: "5px",
  
  ["svg"]: {
    width: "20px",
    height: "20px",
  },

  ["&:hover"]: {

    cursor: "pointer",
    backgroundColor: "#ffffff",

    ["svg"]: {
      color: "red",
    },
    
  }
});

const StyledOptionText = styled('div', {

  paddingLeft: "8px",
  paddingRight: "8px",
  marginLeft: "8px",
  borderRadius: "5px",

  ["&:hover"]: {
    backgroundColor: "white",
    cursor: "pointer",
  }
})

export const DeleteTaskControl = ({onDelete}: DeleteTaskControlProps) => {

  const [isOpen, setIsOpen] = useState(false);

  if(isOpen) {

    return (
      <Box css={{display: 'flex'}}>
        <StyledOptionText onClick={() => {
          onDelete();
          setIsOpen(false);
        }}>Yes</StyledOptionText>
        <StyledOptionText onClick={() => setIsOpen(false)}>No</StyledOptionText>
      </Box>
    )

  }
  return (<Box>
    <StyledDeleteIcon onClick={() => setIsOpen(!isOpen)
    }>
      <TrashIcon />
    </StyledDeleteIcon>
  </Box>)
}