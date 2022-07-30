/* eslint-disable react/jsx-props-no-spreading */

import "../styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import theme from "../styles/theme";
import { SettingsFormObj } from "../utils/types";
import logger from "../utils/logger";

function MyApp({ Component, pageProps }: AppProps) {
  const [settings] = useLocalStorage<SettingsFormObj>({
    key: "settings",
    defaultValue: {
      timerMinutes: 45,
      timerSeconds: 0,
      breakMinutes: 25,
      breakSeconds: 0,
      notifications: true,
      volume: 50,
    },
  });

  const [limit, setLimit] = useState(3);

  useEffect(() => {
    if (settings.notifications) {
      setLimit(3000);
    } else {
      setLimit(0);
    }
    logger.info(limit);
  }, [limit, settings.notifications]);

  return (
    <>
      <Head>
        <title>TaskPlanner</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <NotificationsProvider autoClose={limit} position="bottom-center">
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}

export default MyApp;
