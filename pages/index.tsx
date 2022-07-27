import type { NextPage } from "next";
import { AppShell, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import superjson from "superjson";

// import logger from "../utils/logger";
import { useLocalStorage } from "@mantine/hooks";

import TimerModule from "../components/TimerModule";
import TasksContainer from "../components/TaskComponents/TasksContainer";
import { TaskObj } from "../utils/types";
// import FooterModule from "../components/AppShell/FooterModule";
// import HeaderModule from "../components/AppShell/HeaderModule";
// import Navigation from "../components/AppShell/Navigation";

const HomePage: NextPage = () => {
  const [taskStorage, setTaskStorage] = useLocalStorage<TaskObj[]>({
    key: "storedTasks",
    defaultValue: [],
    serialize: superjson.stringify,
    deserialize: (str) => (str === undefined ? [] : superjson.parse(str)),
  });

  const [storedSeconds, setStoredSeconds] = useLocalStorage({
    key: "seconds",
    defaultValue: 0,
  });
  const [storedMinutes, setStoredMinutes] = useLocalStorage({
    key: "minutes",
    defaultValue: 45,
  });
  const [storedSegment, setStoredSegment] = useLocalStorage({
    key: "segment",
    defaultValue: "timer",
  });
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(45);
  const [segment, setSegment] = useState("timer");

  useEffect(() => {
    setSeconds(storedSeconds);
    setMinutes(storedMinutes);
    setSegment(storedSegment);
  }, [storedMinutes, storedSeconds, storedSegment]);

  return (
    <AppShell
      fixed
      // footer={<FooterModule />}
      // header={<HeaderModule opened={opened} setOpened={setOpened} />}
      // navbar={<Navigation opened={opened} />}
      sx={(theme) => ({
        backgroundColor: theme.colors.main[0],
      })}
    >
      <Stack sx={{ textAlign: "center" }}>
        <TimerModule
          seconds={seconds}
          minutes={minutes}
          segment={segment}
          setSegment={setStoredSegment}
          setSeconds={setStoredSeconds}
          setMinutes={setStoredMinutes}
        />
        <TasksContainer
          taskStorage={taskStorage}
          setTaskStorage={setTaskStorage}
        />
      </Stack>
    </AppShell>
  );
};

export default HomePage;
