import { Burger, Header, MediaQuery } from "@mantine/core";

type headerProps = {
  opened: boolean;
  setOpened: any;
};

export default function HeaderModule({
  opened,
  setOpened,
}: headerProps): JSX.Element {
  return (
    <Header height={70} p="md">
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o: boolean) => !o)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>
        Application header
      </div>
    </Header>
  );
}
