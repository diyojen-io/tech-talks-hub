import { alpha } from "@mui/material/styles";

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

const PRIMARY = {
  lighter: "#f0f0f0",
  light: "#d0d0d0",
  main: "#a0a0a0",
  dark: "#707070",
  darker: "#404040",
};
const SECONDARY = {
  lighter: "#f8f8f8",
  light: "#e0e0e0",
  main: "#b0b0b0",
  dark: "#808080",
  darker: "#505050",
};
const INFO = {
  lighter: "#f0f0f0",
  light: "#d0d0d0",
  main: "#a0a0a0",
  dark: "#707070",
  darker: "#404040",
};
const SUCCESS = {
  lighter: "#e9e9e9",
  light: "#c9c9c9",
  main: "#999999",
  dark: "#696969",
  darker: "#393939",
};
const WARNING = {
  lighter: "#f9f9f9",
  light: "#d9d9d9",
  main: "#a9a9a9",
  dark: "#797979",
  darker: "#494949",
};
const ERROR = {
  lighter: "#f7f7f7",
  light: "#d7d7d7",
  main: "#a7a7a7",
  dark: "#777777",
  darker: "#474747",
};

const GREY = {
  0: "#ffffff",
  100: "#f9f9f9",
  200: "#e6e6e6",
  300: "#d3d3d3",
  400: "#c0c0c0",
  500: "#a9a9a9",
  600: "#808080",
  700: "#696969",
  800: "#505050",
  900: "#303030",
  500_8: alpha("#a9a9a9", 0.08),
  500_12: alpha("#a9a9a9", 0.12),
  500_16: alpha("#a9a9a9", 0.16),
  500_24: alpha("#a9a9a9", 0.24),
  500_32: alpha("#a9a9a9", 0.32),
  500_48: alpha("#a9a9a9", 0.48),
  500_56: alpha("#a9a9a9", 0.56),
  500_80: alpha("#a9a9a9", 0.8),
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const CHART_COLORS = {
  violet: ["#f0f0f0", "#d0d0d0", "#a0a0a0", "#707070"],
  blue: ["#e0e0e0", "#b0b0b0", "#808080", "#505050"],
  green: ["#f8f8f8", "#c8c8c8", "#989898", "#686868"],
  yellow: ["#f9f9f9", "#d9d9d9", "#a9a9a9", "#797979"],
  red: ["#f7f7f7", "#d7d7d7", "#a7a7a7", "#777777"],
};

const COMMON = {
  common: { black: "#000", white: "#fff" },
  primary: { ...PRIMARY, contrastText: "#fff" },
  secondary: { ...SECONDARY, contrastText: "#fff" },
  info: { ...INFO, contrastText: "#fff" },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: "#fff" },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const palette = {
  light: {
    ...COMMON,
    mode: "light",
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
    background: { paper: "#fff", default: "#fff", neutral: GREY[200] },
    action: { active: GREY[600], ...COMMON.action },
  },
  dark: {
    ...COMMON,
    mode: "dark",
    text: { primary: "#fff", secondary: GREY[500], disabled: GREY[600] },
    background: { paper: GREY[800], default: GREY[900], neutral: GREY[500_16] },
    action: { active: GREY[500], ...COMMON.action },
  },
};

export default palette;
