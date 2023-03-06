import React from "react";
import useTask from "../../hooks/useTask";
import { styled } from '@stitches/react';
import { StyledTaskCheck, TaskCheck } from "./TaskCheck";
import Box from "../Box";
import { PlaceholderBlock } from "./PlaceholderBlock";
import { DeleteTaskControl } from "./DeleteTaskControl";
import { MarkdownPostProcessorContext } from "obsidian";
import { ObsidianTodoistSettings } from "main";


const StyledTaskTitle = styled('div', {});

const StyledTaskBlock = styled('div', {
  padding: "8px",
  marginTop: "8px",
  marginBottom: "8px",
  backgroundColor: "#EEEEEE",
  borderRadius: "5px",
  variants: {
    isCompleted: {
      true: {
        [`${StyledTaskTitle}`]: {
          textDecoration: "line-through"
        }
      },
      false: {
        [`${StyledTaskTitle}`]: {
          textDecoration: "none"
        }
      }
    }
  }
});





export type TaskBlockProps = {
  id: string;  
  settings: ObsidianTodoistSettings;
  onRemoveBlock: () => void;
}

export const TaskBlock = ({id, settings, onRemoveBlock }: TaskBlockProps) => {

  
  const {isLoading, isUpdating, task, toggleTask, deleteTask} = useTask(id, settings.todoistApiKey!);

  if(isLoading) {
    return <PlaceholderBlock placeholderText="Loading..."/>
  }

  if(!task) {
    return <>No task</>
  }

  const {content: title, isCompleted} = task;

  const handleToggleTask = () => {
    toggleTask();
  }

  const handleDeleteTask = () => {
    deleteTask()
      .then(() => onRemoveBlock());
      
    return;
  }

  return (
    <StyledTaskBlock isCompleted={isCompleted}>
      <Box css={{
        display:"flex",
        width: "100%",
        paddingRight: "20px",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Box css={{
          display:"flex",
          flexDirection: "row",
          alignItems: "center"
        }}>
          <Box css={{marginRight: "10px"}}>
            <TaskCheck isUpdating={isUpdating} isChecked={isCompleted} onToggle={handleToggleTask}/>
          </Box>
          <StyledTaskTitle>{title}</StyledTaskTitle>
        </Box>
        <DeleteTaskControl onDelete={handleDeleteTask} />
      </Box>
      
    </StyledTaskBlock>
  )

  
}