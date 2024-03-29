import { MantineThemeOverride } from "@mantine/core";

const theme: MantineThemeOverride = {
  breakpoints: {
    xs: 280,
    sm: 500,
    md: 800,
    lg: 1200,
    xl: 1400,
  },
  colors: {
    // main: [
    //   "#d7f8ff",
    //   "#88dbe7",
    //   "#44CADC",
    //   "#2AC9DE",
    //   "#1AC2D9",
    //   "#11B7CD",
    //   "#09ADC3",
    //   "#0E99AC",
    //   "#128797",
    //   "#147885",
    // ],
    // Material Main
    main: [
      "#E1F5FE",
      "#B3E5FC",
      "#81D4FA",
      "#4FC3F7",
      "#29B6F6",
      "#03A9F4",
      "#039BE5",
      "#0288D1",
      "#0277BD",
      "#01579B",
    ],

    custom_cyan: [
      "#E0F7FA",
      "#B2EBF2",
      "#80DEEA",
      "#4DD0E1",
      "#26C6DA",
      "#00BCD4",
      "#00ACC1",
      "#0097A7",
      "#00838F",
      "#006064",
    ],
    custom_red: [
      "#f0bbbb",
      "#ed9b9b",
      "#ec7c7c",
      "#ed5d5d",
      "#f13e3e",
      "#f71f1f",
      "#fd4f4f",
      "#e00808",
      "#c50e0e",
      "#ad1313",
    ],
    custom_green: [
      "#F1F8E9",
      "#DCEDC8",
      "#C5E1A5",
      "#AED581",
      "#9CCC65",
      "#8BC34A",
      "#7CB342",
      "#689F38",
      "#558B2F",
      "#33691E",
    ],
  },
};

export default theme;
