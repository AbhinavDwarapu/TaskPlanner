import type { NextPage } from "next";
import { AppShell, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import logger from "../utils/logger";

import Navigation from "../components/AppShell/Navigation";
import TimerModule from "../components/TimerModule";
import CurrentTasks from "../components/CurrentTasks";
import TaskLake from "../components/TaskLake";
import FooterModule from "../components/AppShell/FooterModule";
import HeaderModule from "../components/AppShell/HeaderModule";

const TimePage: NextPage = () => {
  const [opened, setOpened] = useState(false);

  // Only minutes and seconds are relevant
  const [seconds, setSeconds] = useState(2);
  const [minutes, setMinutes] = useState(1);
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

    logger.info(seconds);
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
          setTimeToggle={setTimeToggle}
        />

        <CurrentTasks />
        <TaskLake />
      </Stack>
    </AppShell>
  );
};

export default TimePage;
