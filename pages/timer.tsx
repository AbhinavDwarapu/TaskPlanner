import type { NextPage } from "next";
import { AppShell, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
// import logger from "../utils/logger";
import { TaskObj } from "../utils/types";

import Navigation from "../components/AppShell/Navigation";
import TimerModule from "../components/TimerModule";
import CurrentTasks from "../components/TaskComponents/CurrentTasks";
import TaskLake from "../components/TaskComponents/TaskLake";
import FooterModule from "../components/AppShell/FooterModule";
import HeaderModule from "../components/AppShell/HeaderModule";

const TimePage: NextPage = () => {
  const [opened, setOpened] = useState(false);
  const [tasks, setTasks] = useState<TaskObj[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(45);
  const [timeToggle, setTimeToggle] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let timer: string | number | NodeJS.Timer;
    if (timeToggle) {
      timer = setInterval(() => {
        if (seconds === 0 && minutes === 0) {
          return;
        }
        if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
          return;
        }
        setSeconds(seconds - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [minutes, seconds, timeToggle]);

  return (
    <AppShell
      fixed
      footer={<FooterModule />}
      header={<HeaderModule opened={opened} setOpened={setOpened} />}
      navbar={<Navigation opened={opened} />}
    >
      <Stack sx={{ textAlign: "center" }}>
        <TimerModule
          seconds={seconds}
          minutes={minutes}
          timeToggle={timeToggle}
          setSeconds={setSeconds}
          setMinutes={setMinutes}
          setTimeToggle={setTimeToggle}
        />

        <CurrentTasks
          minutes={minutes}
          seconds={seconds}
          tasks={tasks}
          setTasks={setTasks}
        />
        <TaskLake />
      </Stack>
    </AppShell>
  );
};

export default TimePage;
