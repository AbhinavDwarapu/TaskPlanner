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
import { GrPowerReset } from "react-icons/gr";
import { BsCheckLg } from "react-icons/bs";
import { SettingsFormObj } from "../../utils/types";

interface SettingsProps {
  opened: boolean;
  // settings: SettingsFormObj;
  setOpened: Dispatch<SetStateAction<boolean>>;
  setSettings: Dispatch<SetStateAction<SettingsFormObj>>;
}

const SettingsModal = ({
  opened,
  // settings,
  setOpened,
  setSettings,
}: SettingsProps): JSX.Element => {
  // const [value, setValue] = useState(0);
  // const handlers = useRef<NumberInputHandlers>();
  const [checked, setChecked] = useState(true);
  const theme = useMantineTheme();

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data: SettingsFormObj = {
      timerMinutes: e.currentTarget.timerMinutes.value,
      timerSeconds: e.currentTarget.timerSeconds.value,
      breakMinutes: e.currentTarget.breakMinutes.value,
      breakSeconds: e.currentTarget.breakSeconds.value,
      notifications: e.currentTarget.notif.checked,
    };

    setSettings(data);
    setOpened(false);
  }

  return (
    <Modal
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
              max={99}
              min={0}
              label="Minutes"
              hideControls
              styles={{ input: { width: "4rem", textAlign: "center" } }}
            />
            <NumberInput
              id="timerSeconds"
              defaultValue={0}
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
            max={99}
            min={0}
            label="Minutes"
            hideControls
            styles={{ input: { width: "4rem", textAlign: "center" } }}
          />
          <NumberInput
            id="breakSeconds"
            defaultValue={0}
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
          id="notif"
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
            id="deleteTasks"
            color="custom_red"
            sx={() => ({
              color: "black",
            })}
          >
            Delete ALL Tasks
          </Button>
          <Tooltip label="Reset settings">
            <Button color="custom_red" id="reset">
              <GrPowerReset />
            </Button>
          </Tooltip>
        </Group>
        <Space h="xl" />
        <Divider />
        <Space h="xl" />
        <Button type="submit">Save Settings</Button>
      </form>
    </Modal>
  );
};

export default SettingsModal;
