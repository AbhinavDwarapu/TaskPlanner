/* eslint-disable react/jsx-no-bind */

import {
  Box,
  Button,
  Center,
  Grid,
  MediaQuery,
  SegmentedControl,
  Space,
} from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
// import logger from "../utils/logger";
import padZero from "../utils/timeFormat";

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
  const [segmentColour, setSegmentColour] = useState("theme.colors.custom[9]");
  const [startButton, setStartButton] = useState("Start");

  function handleSegment(e: string) {
    setSegment(e);
    if (e === "timer") {
      setSegmentColour("theme.colors.custom[9]");
      setTimeToggle(false);
      setMinutes(45);
      setSeconds(0);
      setStartButton("Start");
    } else {
      setSegmentColour("red");
      setTimeToggle(false);
      setMinutes(25);
      setSeconds(0);
      setStartButton("Start");
    }
  }

  function handleClick() {
    setTimeToggle(!timeToggle);
    if (startButton === "Start") {
      setStartButton("Pause");
    } else {
      setStartButton("Start");
    }
  }

  // logger.info(timerTime.getHours());

  function handleReset() {
    if (segment === "timer") {
      setTimeToggle(false);
      setMinutes(45);
      setSeconds(0);
      setStartButton("Start");
    } else {
      setTimeToggle(false);
      setMinutes(25);
      setSeconds(0);
      setStartButton("Start");
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
          // color={segmentColour}
          transitionDuration={300}
          sx={(theme) => ({
            backgroundColor: theme.colors.custom[1],
          })}
          data={[
            { label: "Timer", value: "timer" },
            { label: "Break", value: "break" },
          ]}
        />
        <Space h="md" />
        <MediaQuery smallerThan="md" styles={{ fontSize: "5rem" }}>
          <Center
            sx={(theme) => ({
              backgroundColor: theme.colors.custom[1],
              height: "200px",
              fontSize: "6rem",
              borderRadius: "24px",
              color: theme.colors.custom[9],
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
              color="custom"
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
              color="custom2"
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
