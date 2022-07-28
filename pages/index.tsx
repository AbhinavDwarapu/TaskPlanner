import type { NextPage } from "next";
import { AppShell, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import superjson from "superjson";

import { useLocalStorage } from "@mantine/hooks";

import TimerModule from "../components/TimerModule";
import TasksContainer from "../components/TaskComponents/TasksContainer";
import { SettingsFormObj, TaskObj } from "../utils/types";
import SettingsContainer from "../components/SettingsComponents/SettingsContainer";

const HomePage: NextPage = () => {
  const [settings, setSettings] = useLocalStorage<SettingsFormObj>({
    key: "settings",
    defaultValue: {
      timerMinutes: 45,
      timerSeconds: 0,
      breakMinutes: 25,
      breakSeconds: 0,
      notifications: true,
    },
  });

  const [taskStorage, setTaskStorage] = useLocalStorage<TaskObj[]>({
    key: "storedTasks",
    defaultValue: [],
    serialize: superjson.stringify,
    deserialize: (str) => (str === undefined ? [] : superjson.parse(str)),
  });

  const [storedSeconds, setStoredSeconds] = useLocalStorage({
    key: "seconds",
    defaultValue: settings.timerSeconds,
  });
  const [storedMinutes, setStoredMinutes] = useLocalStorage({
    key: "minutes",
    defaultValue: settings.timerMinutes,
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
        <SettingsContainer settings={settings} setSettings={setSettings} />
        <TimerModule
          seconds={seconds}
          minutes={minutes}
          segment={segment}
          settings={settings}
          setSegment={setStoredSegment}
          setSeconds={setStoredSeconds}
          setMinutes={setStoredMinutes}
          // setSettings={setSettings}
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
