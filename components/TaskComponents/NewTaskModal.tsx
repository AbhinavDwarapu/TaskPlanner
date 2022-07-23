import {
  Button,
  InputWrapper,
  Modal,
  Space,
  Textarea,
  TextInput,
} from "@mantine/core";

import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { DatePicker, TimeInput } from "@mantine/dates";
import { HiClock } from "react-icons/hi";
import { BsFillCalendar2CheckFill } from "react-icons/bs";
import { MdDescription } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";

import logger from "../../utils/logger";
import { TaskFormObj, TaskObj } from "../../utils/types";

interface Props {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  tasks: TaskObj[];
  setTasks: Dispatch<SetStateAction<TaskObj[]>>;
}

const NewTimerModal = ({
  opened,
  setOpened,
  tasks,
  setTasks,
}: Props): JSX.Element => {
  const [timeValue, setTimeValue] = useState(new Date());

  const [taskError, setTaskError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    if (!opened) {
      setTaskError("");
      setDescriptionError("");
      setTimeError("");
      setDateError("");
    }
  }, [opened]);

  function submitForm(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const data: TaskFormObj = {
      name: e.currentTarget.task.value,
      description: e.currentTarget.description.value,
      startTime: timeValue,
      date: e.currentTarget.date.value,
    };

    // Data validation
    // Time and date are validated with HTML
    if (data.name.length > 128) {
      setTaskError("Task Name is over 128 characters long.");
      return;
    }
    if (data.description) {
      if (data.description.length > 512) {
        setTaskError("Description is over 512 characters long.");
      }
    }

    const tempTask: TaskObj = {
      id: Math.floor(new Date().getTime() * Math.random()).toString(),
      name: data.name,
      description: data.description,
      date: data.date,
      startTime: data.startTime,
      done: false,
    };

    logger.info(data.date);
    const tempTasks = [...tasks, tempTask];
    setTasks(tempTasks);
    setOpened(false);
  }

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      title="Create A New Task"
      transition="rotate-right"
      transitionDuration={350}
      transitionTimingFunction="ease"
      overlayOpacity={0.55}
      // sx={(theme) => ({
      //   backgroundColor: theme.colors.ocean[3],
      // })}
    >
      <form onSubmit={submitForm}>
        <InputWrapper>
          <TextInput
            label="Task Name"
            id="task"
            icon={<AiFillCheckCircle />}
            placeholder="Your task name"
            required
            error={taskError}
          />
          <Textarea
            description="optional"
            label="Description"
            id="description"
            icon={<MdDescription />}
            placeholder="Your description"
            autosize
            minRows={1}
            maxRows={3}
            error={descriptionError}
          />
          <TimeInput
            label="Pick Time"
            placeholder="Pick time"
            icon={<HiClock />}
            defaultValue={new Date()}
            id="time"
            clearable
            hoursLabel="Hours"
            minutesLabel="Minutes"
            description="optional"
            error={timeError}
            value={timeValue}
            onChange={setTimeValue}
          />
          <DatePicker
            placeholder="Pick date"
            label="Event Date"
            id="date"
            icon={<BsFillCalendar2CheckFill />}
            defaultValue={new Date()}
            description="optional"
            error={dateError}
          />
          <Space h="md" />
          <Button sx={{ float: "right" }} type="submit">
            Create Task
          </Button>
        </InputWrapper>
      </form>
    </Modal>
  );
};

export default NewTimerModal;
