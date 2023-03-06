import React from "react";
import { keyframes, styled } from '@stitches/react';
import { CheckIcon } from "@radix-ui/react-icons";


export const StyledTaskCheck = styled('div', {
  width: "30px",
  height: "30px",
  backgroundColor: "#FFFFFF",

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  borderRadius: "50%",
  border: "1px solid #DDDDDD",

  ["&:hover"]: {
    borderColor: "#5679D6"
  },


  variants: {
    isChecked: {
      true: {
      },
      false: {
      }
    },
    isUpdating: {
      true: {
        ["&:hover"]: {
          cursor: "default"
        },
      },
      false: {
        ["&:hover"]: {
          cursor: "pointer"
        },
      }
    } 
  }
});


const StyledCheckIcon = styled('div', {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ["svg"]: {
    width: "22px",
    height: "22px"
  }
});


const rotateAnimation = keyframes({
  '0%': { transform: 'roate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});


const StyledLoadingSpinner = styled('div', {
  "width": "22px",
  "height": "22px",
  "border": "2px solid #CCCCCC",
  "borderBottomColor": "transparent",
  "borderRadius": "50%",
  "display": "inline-block",
  "boxSizing": "border-box",
  "animation": `${rotateAnimation} 1s linear infinite`
})


export type TaskCheckProps = {
  isChecked: boolean;
  isUpdating: boolean;
  onToggle: () => void  
}

export const TaskCheck = ({isChecked, isUpdating, onToggle}: TaskCheckProps) => {
  return <StyledTaskCheck isUpdating={isUpdating} isChecked={isChecked} onClick={() => !isUpdating && onToggle()}>
    {isUpdating && <StyledLoadingSpinner />}
    {isChecked && !isUpdating && <StyledCheckIcon>
      <CheckIcon />
    </StyledCheckIcon>}
  </StyledTaskCheck>
}