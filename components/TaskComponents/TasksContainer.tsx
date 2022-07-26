import { Box, Button, MediaQuery } from "@mantine/core";
import React, { Dispatch, SetStateAction, useState } from "react";
import { TaskObj } from "../../utils/types";
// import logger from "../../utils/logger";
import NewTaskModal from "./NewTaskModal";

import TaskPanel from "./TaskPanel";

interface tasksProps {
  // minutes: number;
  // seconds: number;
  tasks: TaskObj[];
  setTasks: Dispatch<SetStateAction<TaskObj[]>>;
}

const TasksContainer = ({
  // minutes,
  // seconds,
  tasks,
  setTasks,
}: tasksProps): JSX.Element => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <MediaQuery largerThan="md" styles={{ width: "700px" }}>
        <Box
          id="TaskContainerBox"
          sx={(theme) => ({
            margin: "auto",
            width: "90%",
            backgroundColor: theme.colors.main[1],
            borderRadius: "24px",
          })}
        >
          <Box>
            {tasks.map((task) => {
              return (
                <TaskPanel
                  key={task.id}
                  task={task}
                  tasks={tasks}
                  setTasks={setTasks}
                />
              );
            })}
          </Box>

          <NewTaskModal
            opened={opened}
            setOpened={setOpened}
            tasks={tasks}
            setTasks={setTasks}
          />
        </Box>
      </MediaQuery>
      <MediaQuery largerThan="md" styles={{ width: "700px" }}>
        <Button
          id="CreateTaskButton"
          color="main"
          onClick={() => {
            setOpened(true);
          }}
          sx={() => ({
            margin: "auto",
            borderRadius: "48px",
            width: "90%",
          })}
          size="lg"
        >
          Create New Task
        </Button>
      </MediaQuery>
    </>
  );
};

export default TasksContainer;
