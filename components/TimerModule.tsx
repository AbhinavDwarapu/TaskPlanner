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
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { GrPowerReset } from "react-icons/gr";
import { IoMdPause } from "react-icons/io";
import { FaPlay } from "react-icons/fa";

import padZero from "../utils/timeFormat";
import { SettingsFormObj } from "../utils/types";
// import logger from "../utils/logger";

interface timerProps {
  seconds: number;
  minutes: number;
  segment: string;
  settings: SettingsFormObj;
  setSeconds: Dispatch<SetStateAction<number>>;
  setMinutes: Dispatch<SetStateAction<number>>;
  setSegment: Dispatch<SetStateAction<string>>;
  // setSettings: Dispatch<SetStateAction<SettingsFormObj>>;
}

const TimerModule = ({
  seconds,
  minutes,
  segment,
  settings,
  setSeconds,
  setMinutes,
  setSegment,
}: // setSettings,
timerProps): JSX.Element => {
  const [segmentColour, setSegmentColour] =
    useState<DefaultMantineColor>("custom_green");
  const [startButton, setStartButton] = useState(<FaPlay />);

  const [timeToggle, setTimeToggle] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let timer: string | number | NodeJS.Timer;
    if (timeToggle) {
      timer = setInterval(() => {
        if (seconds === 0 && minutes === 0) {
          return;
        }
        if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
          return;
        }
        setSeconds(seconds - 1);
      }, 1000);
    }
    if (segment === "timer") {
      setSegmentColour("custom_green");
    } else {
      setSegmentColour("custom_red");
    }
    return () => {
      clearInterval(timer);
    };
  }, [minutes, seconds, segment, setMinutes, setSeconds, timeToggle]);

  function handleSegment(e: string) {
    setSegment(e);
    if (e === "timer") {
      setSegmentColour("custom_green");
      setTimeToggle(false);
      setMinutes(settings.timerMinutes);
      setSeconds(settings.timerSeconds);
      setStartButton(<FaPlay />);
    } else {
      setSegmentColour("custom_red");
      setTimeToggle(false);
      setMinutes(settings.breakMinutes);
      setSeconds(settings.breakSeconds);
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
      setMinutes(settings.timerMinutes);
      setSeconds(settings.timerSeconds);
      setStartButton(<FaPlay />);
    } else {
      setTimeToggle(false);
      setMinutes(settings.breakMinutes);
      setSeconds(settings.breakSeconds);
      setStartButton(<FaPlay />);
    }
  }

  return (
    <MediaQuery largerThan="md" styles={{ width: "700px" }}>
      <Box sx={{ margin: "auto", width: "90%" }} id="TimerModuleBox">
        <SegmentedControl
          id="SegmentControl"
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
            id="TimeView"
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
              id="PlayButton"
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
              id="Reset Button"
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
