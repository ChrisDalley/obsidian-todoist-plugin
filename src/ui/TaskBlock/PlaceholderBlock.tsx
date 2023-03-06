import React from "react";
import useTask from "../../hooks/useTask";
import { styled } from '@stitches/react';
import Box from "../Box";
import { TaskCheck } from "./TaskCheck";



const StyledPlaceholderBlock = styled('div', {
  padding: "8px",
  marginTop: "8px",
  marginBottom: "8px",
  backgroundColor: "#EEEEEE",
  borderRadius: "5px",
  
});


type PlaceholderBlockProps = {
  placeholderText: string;
}


export const PlaceholderBlock = ({placeholderText}: PlaceholderBlockProps) => {

  return (
    <StyledPlaceholderBlock>
      <Box css={{
        display:"flex",
        flexDirection: "row",
        alignItems: "center"
      }}>
        <Box css={{marginRight: "10px"}}>
          <TaskCheck isUpdating={true} isChecked={false} onToggle={() => false}/>
        </Box>
        <Box>
          {placeholderText}
        </Box>
      </Box>
    </StyledPlaceholderBlock>
  )

  
}