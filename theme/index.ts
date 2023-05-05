import { createTheme as createMuiTheme } from "@mui/material";
import { createPalette } from "./CreatePalette";
import { createComponents } from "./CreateComponents";
import { createShadows } from "./CreateShadows";
import { createTypography } from "./CreateTypography";

export function createTheme() {
  const palette = createPalette();
  const components = createComponents({ palette });
  const shadows = createShadows();
  const typography = createTypography();

  return createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440,
      },
    },
    components,
    palette,
    shadows,
    shape: {
      borderRadius: 8,
    },
    typography,
  });
}
