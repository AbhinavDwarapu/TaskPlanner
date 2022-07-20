import { Box, Button, MediaQuery } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
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
    };
    const tempTasks = [...tasks, tempTask];
    setTasks(tempTasks);
    logger.info(tasks);
  }

  // @ts-ignore
  return (
    <MediaQuery smallerThan="md" styles={{ width: "250px" }}>
      <Box sx={{ margin: "auto", width: "40%", backgroundColor: "lightcoral" }}>
        <Box>
          {tasks.map((task) => {
            return <div key={task.id}>{task.name}</div>;
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
