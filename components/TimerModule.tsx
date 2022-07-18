/* eslint-disable react/jsx-no-bind */

import {
  Box,
  Button,
  Center,
  MediaQuery,
  SegmentedControl,
} from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
// import logger from "../utils/logger";

interface timerProps {
  seconds: number;
  setSeconds: Dispatch<SetStateAction<number>>;
  minutes: number;
  setMinutes: Dispatch<SetStateAction<number>>;
  timeToggle: boolean;
  setTimeToggle: Dispatch<SetStateAction<boolean>>;
}

function padZero(integer: number): string {
  if (integer < 10) {
    return `0${integer}`;
  }
  return integer.toString();
}

const TimerModule = ({
  seconds,
  setSeconds,
  minutes,
  setMinutes,
  timeToggle,
  setTimeToggle,
}: timerProps): JSX.Element => {
  const [segment, setSegment] = useState("timer");
  const [segmentColour, setSegmentColour] = useState("blue");
  const [startButton, setStartButton] = useState("Start");

  function handleSegment(e: string) {
    setSegment(e);
    if (e === "timer") {
      setSegmentColour("blue");
    } else {
      setSegmentColour("red");
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

  return (
    <MediaQuery smallerThan="md" styles={{ width: "250px" }}>
      <Box sx={{ margin: "auto", width: "40%" }}>
        <SegmentedControl
          fullWidth
          radius="md"
          size="lg"
          value={segment}
          onChange={handleSegment}
          color={segmentColour}
          transitionDuration={300}
          data={[
            { label: "Timer", value: "timer" },
            { label: "Break", value: "break" },
          ]}
        />
        <MediaQuery smallerThan="md" styles={{ fontSize: "5rem" }}>
          <Center
            sx={{
              backgroundColor: "red",
              height: "200px",
              fontSize: "6rem",
            }}
          >
            {padZero(minutes)} {padZero(seconds)}
          </Center>
        </MediaQuery>
        <Button sx={{ width: "80%" }} onClick={handleClick}>
          {startButton}
        </Button>
        <Button
          sx={{ width: "20%", backgroundColor: "pink" }}
          onClick={() => {
            setTimeToggle(false);
            setMinutes(45);
            setSeconds(0);
            setStartButton("Start");
          }}
        >
          X
        </Button>
      </Box>
    </MediaQuery>
  );
};

export default TimerModule;
