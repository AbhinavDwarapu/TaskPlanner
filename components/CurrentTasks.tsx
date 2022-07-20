import { Box, Button, Checkbox, MediaQuery } from "@mantine/core";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { TaskObj } from "../utils/types";
import logger from "../utils/logger";

interface tasksProps {
  minutes: number;
  seconds: number;
  tasks: TaskObj[];
  setTasks: Dispatch<SetStateAction<TaskObj[]>>;
}

const CurrentTasks = ({
  minutes,
  seconds,
  tasks,
  setTasks,
}: tasksProps): JSX.Element => {
  function createTask() {
    const tempTask: TaskObj = {
      name: "new Task",
      id: new Date().getTime().toString(),
      endTime: new Date(),
      startTime: new Date(),
      done: false,
    };
    const tempTasks = [...tasks, tempTask];
    setTasks(tempTasks);
    logger.info(tasks);
  }

  function completeTask(e: ChangeEvent<HTMLInputElement>) {
    logger.info(e.target.id);
    logger.info(e.target.checked);
    const tempTasks = [...tasks];
    tempTasks.forEach((task) => {
      if (e.target.id === task.id && e.target.checked) {
        task.done = true;
      }
      if (e.target.id === task.id && !e.target.checked) {
        task.done = false;
      }
    });
    setTasks(tempTasks);
  }

  function deleteTask(e: ChangeEvent<HTMLButtonElement>) {
    const tempTasks = [...tasks];
    tempTasks.forEach((task, index, array) => {
      if (e.currentTarget.id === task.id) {
        array.splice(index, 1);
      }
    });
    setTasks(tempTasks);
  }

  // @ts-ignore
  return (
    <MediaQuery smallerThan="md" styles={{ width: "250px" }}>
      <Box sx={{ margin: "auto", width: "40%", backgroundColor: "lightcoral" }}>
        <Box>
          {tasks.map((task) => {
            let strike;
            if (task.done) {
              strike = "line-through";
            }
            return (
              <Box key={task.id}>
                <Box sx={{ textDecoration: strike }}>
                  {task.name} with id: {task.id}
                </Box>
                <Checkbox id={task.id} onClick={completeTask} />
                <Button id={task.id} onClick={deleteTask}>
                  Delete Task
                </Button>
              </Box>
            );
          })}
        </Box>
        <Button fullWidth onClick={createTask}>
          Create New Task
        </Button>
      </Box>
    </MediaQuery>
  );
};

export default CurrentTasks;
