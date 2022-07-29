import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import {
  Box,
  Button,
  ColorSwatch,
  Divider,
  Group,
  Modal,
  NumberInput,
  Space,
  Switch,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";

import { showNotification } from "@mantine/notifications";
import { GrPowerReset } from "react-icons/gr";
import { BsCheckLg } from "react-icons/bs";
import { SettingsFormObj, TaskObj } from "../../utils/types";

interface SettingsProps {
  opened: boolean;
  settings: SettingsFormObj;
  segment: string;
  setOpened: Dispatch<SetStateAction<boolean>>;
  setSettings: Dispatch<SetStateAction<SettingsFormObj>>;
  setSeconds: Dispatch<SetStateAction<number>>;
  setMinutes: Dispatch<SetStateAction<number>>;
  setTaskStorage: Dispatch<SetStateAction<TaskObj[]>>;
}

const SettingsModal = ({
  opened,
  settings,
  segment,
  setOpened,
  setSettings,
  setSeconds,
  setMinutes,
  setTaskStorage,
}: SettingsProps): JSX.Element => {
  const [checked, setChecked] = useState(true);
  const theme = useMantineTheme();

  function setTimers(data: SettingsFormObj) {
    if (segment === "timer") {
      setMinutes(data.timerMinutes);
      setSeconds(data.timerSeconds);
    } else {
      setMinutes(data.breakMinutes);
      setSeconds(data.breakSeconds);
    }
  }

  function handleDeleteTasks() {
    setTaskStorage([]);
    setOpened(false);
    showNotification({
      title: "Deleted!",
      message: "All tasks have been deleted from your browser storage",
      icon: <BsCheckLg size={12} />,
      color: "custom_green",
    });
  }

  function handleResetSettings() {
    // @ts-ignore
    setSettings(undefined);
    setTimers(settings);
    setOpened(false);
    showNotification({
      title: "Reset!",
      message: "Your settings have been reset to their original settings",
      icon: <BsCheckLg size={12} />,
      color: "custom_green",
    });
  }

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data: SettingsFormObj = {
      timerMinutes: parseInt(e.currentTarget.timerMinutes.value, 10),
      timerSeconds: parseInt(e.currentTarget.timerSeconds.value, 10),
      breakMinutes: parseInt(e.currentTarget.breakMinutes.value, 10),
      breakSeconds: parseInt(e.currentTarget.breakSeconds.value, 10),
      notifications: e.currentTarget.Notif.checked,
    };

    if (data.timerMinutes > 99 || data.timerMinutes < 0) {
      setOpened(false);
      return;
    }

    if (data.timerSeconds > 59 || data.timerSeconds < 0) {
      setOpened(false);
      return;
    }

    if (data.breakMinutes > 99 || data.breakMinutes < 0) {
      setOpened(false);
      return;
    }

    if (data.breakSeconds > 59 || data.breakSeconds < 0) {
      setOpened(false);
      return;
    }

    setSettings(data);
    setTimers(data);
    setOpened(false);
    showNotification({
      title: "Saved!",
      message: "Your settings have been saved!",
      icon: <BsCheckLg size={12} />,
      color: "custom_green",
    });
  }

  return (
    <Modal
      id="SettingsModal"
      opened={opened}
      onClose={() => setOpened(false)}
      title="Settings"
      transition="slide-down"
      transitionDuration={350}
      transitionTimingFunction="ease"
      overlayOpacity={0.55}
      sx={{ fontSize: "1.25rem", textAlign: "center" }}
      styles={() => ({
        modal: {
          borderRadius: "24px",
        },
        title: {
          color: theme.colors.main[9],
        },
      })}
    >
      <form onSubmit={submitForm}>
        <Box>
          Timer Settings
          <Group sx={{ justifyContent: "center", textAlign: "center" }}>
            <NumberInput
              id="timerMinutes"
              defaultValue={45}
              value={parseInt(String(settings.timerMinutes), 10)}
              max={99}
              min={0}
              label="Minutes"
              hideControls
              styles={{ input: { width: "4rem", textAlign: "center" } }}
            />
            <NumberInput
              id="timerSeconds"
              defaultValue={0}
              value={parseInt(String(settings.timerSeconds), 10)}
              max={59}
              min={0}
              label="Seconds"
              hideControls
              styles={{ input: { width: "4rem", textAlign: "center" } }}
            />
          </Group>
        </Box>
        <Space h="xl" />
        <Divider />
        <Space h="xl" />
        Break Settings
        <Group sx={{ justifyContent: "center" }}>
          <NumberInput
            id="breakMinutes"
            defaultValue={25}
            value={parseInt(String(settings.breakMinutes), 10)}
            max={99}
            min={0}
            label="Minutes"
            hideControls
            styles={{ input: { width: "4rem", textAlign: "center" } }}
          />
          <NumberInput
            id="breakSeconds"
            defaultValue={0}
            value={parseInt(String(settings.breakSeconds), 10)}
            max={59}
            min={0}
            label="Seconds"
            hideControls
            styles={{ input: { width: "4rem", textAlign: "center" } }}
          />
        </Group>
        <Space h="xl" />
        <Divider />
        <Space h="xl" />
        Notifications
        <Space h="sm" />
        <Switch
          id="Notif"
          defaultChecked={settings.notifications}
          sx={{ justifyContent: "center" }}
          color="main"
          radius="sm"
          size="md"
        />
        <Space h="xl" />
        <Divider />
        <Space h="xl" />
        Theme
        <Space h="sm" />
        <Group position="center" spacing="xs">
          <ColorSwatch
            component="button"
            color={theme.colors.main[6]}
            onClick={() => setChecked((c) => !c)}
            sx={{ color: "#fff", cursor: "pointer" }}
          >
            {checked && <BsCheckLg size={12} />}
          </ColorSwatch>
          <ColorSwatch
            component="button"
            color={theme.colors.custom_red[6]}
            onClick={() => setChecked((c) => !c)}
            sx={{ color: "#fff", cursor: "pointer" }}
          >
            {checked && <BsCheckLg size={12} />}
          </ColorSwatch>
          <ColorSwatch
            component="button"
            color={theme.colors.custom_green[6]}
            onClick={() => setChecked((c) => !c)}
            sx={{ color: "#fff", cursor: "pointer" }}
          >
            {checked && <BsCheckLg size={12} />}
          </ColorSwatch>
        </Group>
        <Space h="xl" />
        <Divider />
        <Space h="xl" />
        <Group sx={{ justifyContent: "center" }}>
          <Button
            id="DeleteTasks"
            color="custom_red"
            sx={() => ({
              color: "black",
            })}
            onClick={() => {
              handleDeleteTasks();
            }}
          >
            Delete ALL Tasks
          </Button>
          <Tooltip label="Reset settings">
            <Button
              color="custom_red"
              id="Reset"
              onClick={() => {
                handleResetSettings();
              }}
            >
              <GrPowerReset />
            </Button>
          </Tooltip>
        </Group>
        <Space h="xl" />
        <Divider />
        <Space h="xl" />
        <Button type="submit" id="SaveSettingsButton">
          Save Settings
        </Button>
      </form>
    </Modal>
  );
};

export default SettingsModal;
