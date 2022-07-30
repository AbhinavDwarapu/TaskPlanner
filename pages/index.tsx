import type { NextPage } from "next";
import { AppShell, DefaultMantineColor, Stack } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import superjson from "superjson";

import { useLocalStorage } from "@mantine/hooks";

import { showNotification } from "@mantine/notifications";
import { BsCheckLg } from "react-icons/bs";
// @ts-ignore
import { Howl, Howler } from "howler";
import TimerModule from "../components/TimerModule";
import TasksContainer from "../components/TaskComponents/TasksContainer";
import { SettingsFormObj, TaskObj } from "../utils/types";
import SettingsContainer from "../components/SettingsComponents/SettingsContainer";
import theme from "../styles/theme";

const HomePage: NextPage = () => {
  const soundRef = useRef(
    new Howl({
      src: ["/ding.mp3"],
    })
  );
  const [settings, setSettings] = useLocalStorage<SettingsFormObj>({
    key: "settings",
    defaultValue: {
      timerMinutes: 45,
      timerSeconds: 0,
      breakMinutes: 25,
      breakSeconds: 0,
      notifications: true,
      volume: 0.1,
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
  const [background, setBackground] = useState<DefaultMantineColor>();

  useEffect(() => {
    setSeconds(storedSeconds);
    setMinutes(storedMinutes);
    setSegment(storedSegment);

    if (storedMinutes === 0 && storedSeconds === 0) {
      // @ts-ignore
      setBackground(theme.colors.custom_green[1]);
      showNotification({
        title: "Done!",
        message: `Timer has reached 0`,
        icon: <BsCheckLg size={12} />,
        color: "custom_green",
      });
      if (settings.notifications) {
        Howler.volume(settings.volume / 100);
        soundRef.current.play();
      }
    } else {
      // @ts-ignore
      setBackground(theme.colors.main[0]);
    }
  }, [
    settings.notifications,
    settings.volume,
    storedMinutes,
    storedSeconds,
    storedSegment,
  ]);

  return (
    <AppShell
      fixed
      // footer={<FooterModule />}
      // header={<HeaderModule opened={opened} setOpened={setOpened} />}
      // navbar={<Navigation opened={opened} />}
      sx={() => ({
        backgroundColor: background,
      })}
    >
      <Stack sx={{ textAlign: "center" }}>
        <SettingsContainer
          segment={segment}
          settings={settings}
          setSettings={setSettings}
          setSeconds={setStoredSeconds}
          setMinutes={setStoredMinutes}
          setTaskStorage={setTaskStorage}
        />
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
