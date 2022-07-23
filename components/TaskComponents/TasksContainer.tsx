import { Box, Button, Divider, Group, MediaQuery } from "@mantine/core";
import React, { Dispatch, SetStateAction, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { TaskObj } from "../../utils/types";
import logger from "../../utils/logger";
import NewTaskModal from "./NewTaskModal";

import padZero from "../../utils/timeFormat";

interface tasksProps {
  minutes: number;
  seconds: number;
  tasks: TaskObj[];
  setTasks: Dispatch<SetStateAction<TaskObj[]>>;
}

const TasksContainer = ({
  /* eslint-disable no-unused-vars */
  minutes,
  seconds,
  tasks,
  setTasks,
}: tasksProps): JSX.Element => {
  const [opened, setOpened] = useState(false);

  function completeTask(e: React.MouseEvent<HTMLInputElement>) {
    const tempTasks = [...tasks];
    tempTasks.forEach((task, index, array) => {
      let tempTask;
      if (e.currentTarget.id === task.id && !task.done) {
        logger.info("Setting Done True");
        tempTask = task;
        tempTask.done = true;
        array.splice(index, 1, tempTask);
      } else if (e.currentTarget.id === task.id && task.done) {
        logger.info("Setting Done False");
        tempTask = task;
        tempTask.done = false;
        array.splice(index, 1, tempTask);
      }
    });
    setTasks(tempTasks);
  }

  function deleteTask(e) {
    const tempTasks = [...tasks];
    tempTasks.forEach((task, index, array) => {
      if (e.currentTarget.id === task.id) {
        array.splice(index, 1);
      }
    });
    setTasks(tempTasks);
  }

  return (
    <>
      <MediaQuery largerThan="md" styles={{ width: "700px" }}>
        <Box
          sx={(theme) => ({
            margin: "auto",
            width: "90%",
            backgroundColor: theme.colors.custom[1],
            borderRadius: "24px",
          })}
        >
          <Box>
            {tasks.map((task) => {
              let strike: string;
              if (task.done) {
                strike = "line-through";
              }
              const date = task.date?.toString();
              let timeString;
              if (task.startTime) {
                const hoursTime = padZero(task.startTime.getHours());
                const minutesTime = padZero(task.startTime.getMinutes());
                timeString = `At ${hoursTime}:${minutesTime}`;
              }

              return (
                <Box
                  key={task.id}
                  sx={(theme) => ({
                    backgroundColor: theme.colors.custom[0],
                    borderRadius: "24px",
                    margin: 8,
                    padding: 16,
                  })}
                >
                  <Box
                    sx={(theme) => ({
                      textDecoration: strike,
                      fontSize: "2rem",
                      color: theme.colors.custom[9],
                    })}
                  >
                    {task.name}
                  </Box>
                  <Box
                    sx={(theme) => ({
                      color: theme.colors.custom[1],
                      fontSize: "0.75rem",
                    })}
                  >
                    ID: {task.id}
                  </Box>
                  <Box
                    sx={(theme) => ({
                      color: theme.colors.custom[2],
                      fontSize: "0.9rem",
                    })}
                  >
                    {date}
                  </Box>
                  <Box
                    sx={(theme) => ({
                      color: theme.colors.custom[2],
                      fontSize: "0.9rem",
                    })}
                  >
                    {timeString}
                  </Box>

                  <Divider
                    my="sm"
                    sx={(theme) => ({
                      borderTopColor: theme.colors.custom[1],
                    })}
                  />
                  <Box sx={{ textAlign: "left" }}>{task.description}</Box>
                  <Group position="center" grow>
                    <Button
                      id={task.id}
                      onClick={(e) => {
                        completeTask(e);
                      }}
                      variant="subtle"
                    >
                      <FaCheckCircle />
                    </Button>
                    <Button
                      id={task.id}
                      onClick={(e) => {
                        deleteTask(e);
                      }}
                      variant="subtle"
                    >
                      <MdDelete />
                    </Button>
                  </Group>
                </Box>
              );
            })}

            {/* <Box sx={{ marginBottom: 8 }} /> */}
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
          color="custom"
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
