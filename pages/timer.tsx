import type { NextPage } from "next";
import { AppShell } from "@mantine/core";

import { useState } from "react";
import Navigation from "../components/Navigation";
import TimerModule from "../components/TimerModule";
import CurrentTasks from "../components/CurrentTasks";
import TaskLake from "../components/TaskLake";
import FooterModule from "../components/FooterModule";
import HeaderModule from "../components/HeaderModule";

const TimePage: NextPage = () => {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      fixed
      footer={<FooterModule />}
      header={<HeaderModule opened={opened} setOpened={setOpened} />}
      navbar={<Navigation opened={opened} />}
    >
      <TimerModule />
      <CurrentTasks />
      <TaskLake />
    </AppShell>
  );
};

export default TimePage;
