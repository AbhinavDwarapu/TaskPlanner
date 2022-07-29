import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, Button, Divider, Group } from "@mantine/core";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { showNotification } from "@mantine/notifications";
import padZero from "../../utils/timeFormat";
import { TaskObj } from "../../utils/types";
// import logger from "../../utils/logger";

interface Props {
  task: TaskObj;
  taskStorage: TaskObj[];
  setTaskStorage: Dispatch<SetStateAction<TaskObj[]>>;
}

const TaskPanel = ({
  task,
  taskStorage,
  setTaskStorage,
}: Props): JSX.Element => {
  const [strike, setStrike] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  function completeTask(e: React.MouseEvent<HTMLInputElement>) {
    const tempTasks = [...taskStorage];
    tempTasks.forEach((currentTask, index, array) => {
      let tempTask;
      if (e.currentTarget.id === currentTask.id && !currentTask.done) {
        tempTask = currentTask;
        tempTask.done = true;
        setStrike("line-through");
        array.splice(index, 1, tempTask);
      } else if (e.currentTarget.id === currentTask.id && currentTask.done) {
        tempTask = currentTask;
        tempTask.done = false;
        setStrike("");
        array.splice(index, 1, tempTask);
      }
    });
    setTaskStorage(tempTasks);
  }

  function deleteTask(e: React.MouseEvent<HTMLInputElement>) {
    const tempTasks = [...taskStorage];
    let taskName;
    tempTasks.forEach((currentTask, index, array) => {
      if (e.currentTarget.id === currentTask.id) {
        taskName = currentTask.name;
        array.splice(index, 1);
      }
    });
    setTaskStorage(tempTasks);
    showNotification({
      title: "Deleted!",
      message: `Task "${taskName}" been deleted`,
    });
  }

  useEffect(() => {
    if (task.done) {
      setStrike("line-through");
    }
    if (task.date) {
      setDate(task.date.toString());
    }
    if (task.startTime) {
      const hoursTime = padZero(task.startTime.getHours());
      const minutesTime = padZero(task.startTime.getMinutes());
      setTime(`At ${hoursTime}:${minutesTime}`);
    }
  }, [strike, task.date, task.done, task.startTime]);

  return (
    <Box
      id="TaskPanel"
      sx={(theme) => ({
        backgroundColor: theme.colors.main[0],
        borderRadius: "24px",
        margin: 8,
        padding: 16,
      })}
    >
      <Box
        id="TaskName"
        sx={(theme) => ({
          textDecoration: strike,
          fontSize: "2rem",
          color: theme.colors.main[9],
        })}
      >
        {task.name}
      </Box>
      <Box
        id="TaskId"
        sx={(theme) => ({
          color: theme.colors.main[1],
          fontSize: "0.75rem",
        })}
      >
        ID: {task.id}
      </Box>
      <Box
        id="TaskDate"
        sx={(theme) => ({
          color: theme.colors.main[2],
          fontSize: "0.9rem",
        })}
      >
        {date}
      </Box>
      <Box
        id="TaskTime"
        sx={(theme) => ({
          color: theme.colors.main[2],
          fontSize: "0.9rem",
        })}
      >
        {time}
      </Box>

      <Divider
        my="sm"
        sx={(theme) => ({
          borderTopColor: theme.colors.main[1],
        })}
      />
      <Box
        id="TaskDescription"
        sx={(theme) => ({
          textAlign: "justify",
          color: theme.colors.main[9],
        })}
      >
        {task.description}
      </Box>
      <Group position="center" grow>
        <Button
          id={task.id}
          onClick={(e: any) => {
            completeTask(e);
          }}
          variant="subtle"
        >
          <FaCheckCircle />
        </Button>
        <Button
          id={task.id}
          onClick={(e: any) => {
            deleteTask(e);
          }}
          variant="subtle"
        >
          <MdDelete />
        </Button>
      </Group>
    </Box>
  );
};

export default TaskPanel;
