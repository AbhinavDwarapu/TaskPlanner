/* eslint-disable react/jsx-no-bind */

import {
  Box,
  Button,
  Center,
  DefaultMantineColor,
  Grid,
  MediaQuery,
  SegmentedControl,
  Space,
} from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { IoMdPause } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import padZero from "../utils/timeFormat";
import theme from "../styles/theme";
import logger from "../utils/logger";

interface timerProps {
  seconds: number;
  minutes: number;
  timeToggle: boolean;
  setSeconds: Dispatch<SetStateAction<number>>;
  setMinutes: Dispatch<SetStateAction<number>>;
  setTimeToggle: Dispatch<SetStateAction<boolean>>;
}

const TimerModule = ({
  seconds,
  minutes,
  timeToggle,
  setSeconds,
  setMinutes,
  setTimeToggle,
}: timerProps): JSX.Element => {
  const [segment, setSegment] = useState("timer");
  const [segmentColour, setSegmentColour] =
    useState<DefaultMantineColor>("custom_green");
  const [startButton, setStartButton] = useState(<FaPlay />);

  function handleSegment(e: string) {
    setSegment(e);
    if (e === "timer") {
      setSegmentColour("custom_green");
      logger.info(theme.colors.main[5]);
      setTimeToggle(false);
      setMinutes(45);
      setSeconds(0);
      setStartButton(<FaPlay />);
    } else {
      setSegmentColour("custom_red");
      setTimeToggle(false);
      setMinutes(25);
      setSeconds(0);
      setStartButton(<FaPlay />);
    }
  }

  function handleClick() {
    setTimeToggle(!timeToggle);
    if (startButton.type === (<IoMdPause />).type) {
      setStartButton(<FaPlay />);
    } else {
      setStartButton(<IoMdPause />);
    }
  }

  function handleReset() {
    if (segment === "timer") {
      setTimeToggle(false);
      setMinutes(45);
      setSeconds(0);
      setStartButton(<FaPlay />);
    } else {
      setTimeToggle(false);
      setMinutes(25);
      setSeconds(0);
      setStartButton(<FaPlay />);
    }
  }

  return (
    <MediaQuery largerThan="md" styles={{ width: "700px" }}>
      <Box sx={{ margin: "auto", width: "90%" }}>
        <SegmentedControl
          fullWidth
          radius={24}
          size="lg"
          value={segment}
          onChange={handleSegment}
          color={segmentColour}
          transitionDuration={300}
          sx={(t) => ({
            backgroundColor: t.colors.main[1],
          })}
          data={[
            { label: "Timer", value: "timer" },
            { label: "Break", value: "break" },
          ]}
        />
        <Space h="md" />
        <MediaQuery smallerThan="md" styles={{ fontSize: "5rem" }}>
          <Center
            sx={(t) => ({
              backgroundColor: t.colors.main[1],
              height: "200px",
              fontSize: "6rem",
              borderRadius: "24px",
              color: t.colors.main[9],
            })}
          >
            {padZero(minutes)} {padZero(seconds)}
          </Center>
        </MediaQuery>
        <Space h="md" />
        <Grid grow columns={10}>
          <Grid.Col span={8}>
            <Button
              sx={() => ({
                height: "48px",
                borderRadius: "24px",
              })}
              fullWidth
              color="main"
              onClick={handleClick}
            >
              {startButton}
            </Button>
          </Grid.Col>
          <Grid.Col span={2}>
            <Button
              fullWidth
              sx={() => ({
                height: "48px",
                borderRadius: "24px",
              })}
              color="custom_red"
              onClick={handleReset}
            >
              <GrPowerReset />
            </Button>
          </Grid.Col>
        </Grid>
      </Box>
    </MediaQuery>
  );
};

export default TimerModule;
