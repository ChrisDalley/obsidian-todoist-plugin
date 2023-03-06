import { TodoistApi } from "@doist/todoist-api-typescript";
import { MarkdownPostProcessorContext } from "obsidian";
import { useEffect, useState } from "react";

type Task = {
  id: string;
  content: string;
  isCompleted: boolean;
}

const useTask = (id: string, todoistApiKey: string) => {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, seterror] = useState("");

  const todoistApi = new TodoistApi(todoistApiKey);


  const fetchTask = async () => {
    setIsLoading(true);
    todoistApi.getTask(id)
      .then((data: Task) => {
        console.log("Task", data)
        setTask(data);
      })
      .catch((error) => {
        seterror("Something went wrong");
        console.log(error);
      })
      .finally(
        () => {
          setIsLoading(false);
        }
      )
  }

  const closeTask = async () => {
    setIsUpdating(true);
    todoistApi.closeTask(id)
      .then(() => {
        console.log("Closed Task");
        if (task) {
          setTask({ ...task, isCompleted: true });
        }
      })
      .catch((error) => {
        seterror("Something went wrong");
        console.log(error);
      })
      .finally(() => {
        setIsUpdating(false);
      })
  }

  const reopenTask = async () => {
    setIsUpdating(true);
    todoistApi.reopenTask(id)
      .then(() => {
        console.log("Opened Task");
        if (task) {
          setTask({ ...task, isCompleted: false });
        }
      })
      .catch((error) => {
        seterror("Something went wrong");
        console.log(error);
      })
      .finally(() => {
        setIsUpdating(false);
      })
  }

  const updateTask = async (updatedTask: Partial<Task>) => {

    setIsUpdating(true);

    todoistApi.updateTask(id, updatedTask)
      .then((data: Task) => {
        console.log("Task", data)
        setTask(data);
      })
      .catch((error) => {
        seterror("Something went wrong");
        console.log(error);
      })
      .finally(() => {
        setIsUpdating(false);
      })
  }

  const deleteTask = async () => {
    setIsUpdating(true);
    return todoistApi.deleteTask(id)
      .catch((error) => {
        seterror("Something went wrong");
        console.log(error);
      });
  }

  const toggleTask = async () => {
    if (!task) {
      return;
    }

    if (task.isCompleted) {
      reopenTask();
    } else {
      closeTask();
    }
  }

  useEffect(() => {
    fetchTask();
  }, [id])

  return { task, isLoading, isUpdating, error, updateTask, toggleTask, deleteTask };
};

export default useTask;