/* eslint-disable react/jsx-no-bind */

import { Box, Button, MediaQuery, SegmentedControl } from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
// import logger from "../utils/logger";

interface timerProps {
  seconds: number;
  minutes: number;
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
  minutes,
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
    <MediaQuery smallerThan="sm" styles={{ width: "250px" }}>
      <Box sx={{ margin: "auto", width: "45%" }}>
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
        <Box sx={{ backgroundColor: "red" }}>
          {padZero(minutes)} {padZero(seconds)}
        </Box>
        <Button fullWidth onClick={handleClick}>
          {startButton}
        </Button>
      </Box>
    </MediaQuery>
  );
};

export default TimerModule;
