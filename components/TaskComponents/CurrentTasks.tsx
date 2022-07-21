import { Box, Button, Checkbox, MediaQuery, Space } from "@mantine/core";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { TaskObj } from "../../utils/types";
// import logger from "../../utils/logger";
import NewTaskModal from "./NewTaskModal";

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
  const [opened, setOpened] = useState(false);

  function completeTask(e: ChangeEvent<HTMLInputElement>) {
    const tempTasks = [...tasks];
    tempTasks.forEach((task, index, array) => {
      let tempTask;
      if (e.target.id === task.id && e.target.checked) {
        tempTask = task;
        tempTask.done = true;
        array.splice(index, 1, tempTask);
      }
      if (e.target.id === task.id && !e.target.checked) {
        tempTask = task;
        tempTask.done = false;
        array.splice(index, 1, tempTask);
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
                  Task: {task.name} with id: {task.id}.
                </Box>
                <Checkbox id={task.id} onClick={completeTask} />
                <Button id={task.id} onClick={deleteTask}>
                  Delete Task
                </Button>
              </Box>
            );
          })}
        </Box>
        <Space h="md" />
        <Button
          onClick={() => {
            setOpened(true);
          }}
        >
          Create New Task
        </Button>
        <NewTaskModal
          opened={opened}
          setOpened={setOpened}
          tasks={tasks}
          setTasks={setTasks}
        />
      </Box>
    </MediaQuery>
  );
};

export default CurrentTasks;
