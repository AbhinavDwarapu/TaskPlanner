import { Burger, Header, MediaQuery } from "@mantine/core";

interface headerProps {
  opened: boolean;
  setOpened: any;
}

const HeaderModule = ({ opened, setOpened }: headerProps): JSX.Element => {
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
};

export default HeaderModule;
