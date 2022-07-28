import { Box, Button, MediaQuery } from "@mantine/core";
import { IoMdSettings } from "react-icons/io";
import { Dispatch, SetStateAction, useState } from "react";
import SettingsModal from "./SettingsModal";
import { SettingsFormObj, TaskObj } from "../../utils/types";

interface SettingsProps {
  segment: string;
  settings: SettingsFormObj;
  setSettings: Dispatch<SetStateAction<SettingsFormObj>>;
  setMinutes: Dispatch<SetStateAction<number>>;
  setSeconds: Dispatch<SetStateAction<number>>;
  setTaskStorage: Dispatch<SetStateAction<TaskObj[]>>;
}

const SettingsContainer = ({
  segment,
  settings,
  setSettings,
  setMinutes,
  setSeconds,
  setTaskStorage,
}: SettingsProps): JSX.Element => {
  const [opened, setOpened] = useState(false);

  return (
    <MediaQuery largerThan="md" styles={{ width: "700px" }}>
      <Box sx={{ margin: "auto", width: "90%" }}>
        <Button
          sx={() => ({
            borderRadius: "24px",
            float: "right",
          })}
          color="main"
          onClick={() => {
            setOpened(!opened);
          }}
        >
          <IoMdSettings />
        </Button>
        <SettingsModal
          opened={opened}
          setOpened={setOpened}
          settings={settings}
          setSettings={setSettings}
          segment={segment}
          setSeconds={setSeconds}
          setMinutes={setMinutes}
          setTaskStorage={setTaskStorage}
        />
      </Box>
    </MediaQuery>
  );
};

export default SettingsContainer;
