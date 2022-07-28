import { Box, Button, MediaQuery } from "@mantine/core";
import { IoMdSettings } from "react-icons/io";
import { Dispatch, SetStateAction, useState } from "react";
import SettingsModal from "./SettingsModal";
import { SettingsFormObj } from "../../utils/types";

interface SettingsProps {
  settings: SettingsFormObj;
  setSettings: Dispatch<SetStateAction<SettingsFormObj>>;
}

const SettingsContainer = ({
  settings,
  setSettings,
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
          // settings={settings}
          setSettings={setSettings}
        />
      </Box>
    </MediaQuery>
  );
};

export default SettingsContainer;
