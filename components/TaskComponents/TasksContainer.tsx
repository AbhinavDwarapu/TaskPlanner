import { Box, Button, MediaQuery } from "@mantine/core";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { TaskObj } from "../../utils/types";

import NewTaskModal from "./NewTaskModal";

import TaskPanel from "./TaskPanel";

interface tasksProps {
  taskStorage: TaskObj[];
  setTaskStorage: Dispatch<SetStateAction<TaskObj[]>>;
}

const TasksContainer = ({
  taskStorage,
  setTaskStorage,
}: tasksProps): JSX.Element => {
  const [opened, setOpened] = useState(false);
  const [tasks, setTasks] = useState<TaskObj[]>([]);

  useEffect(() => {
    setTasks(taskStorage);
  }, [taskStorage]);

  return (
    <>
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
          <Reorder.Group values={tasks} onReorder={setTasks}>
            {tasks.map((task) => (
              <Reorder.Item as="div" key={task.name} value={task} drag>
                <TaskPanel
                  key={task.id}
                  task={task}
                  taskStorage={taskStorage}
                  setTaskStorage={setTaskStorage}
                />
              </Reorder.Item>
            ))}
          </Reorder.Group>

          <NewTaskModal
            opened={opened}
            setOpened={setOpened}
            taskStorage={taskStorage}
            setTaskStorage={setTaskStorage}
          />
        </Box>
      </MediaQuery>
    </>
  );
};

export default TasksContainer;
