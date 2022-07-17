import { MediaQuery, Navbar } from "@mantine/core";

type navigationProps = {
  opened: boolean;
};
export default function Navigation({ opened }: navigationProps): JSX.Element {
  return (
    <MediaQuery largerThan="sm" styles={{ display: "none" }}>
      <Navbar p="md" hiddenBreakpoint="lg" hidden={!opened}>
        Application navbar
      </Navbar>
    </MediaQuery>
  );
}
