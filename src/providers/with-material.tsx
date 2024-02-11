import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FC } from "react";

const theme = createTheme({ palette: { mode: "dark" } });

export const withMaterial = <T extends Record<string, unknown>>(
  Component: FC<T>
) =>
  function props(props: T) {
    return (
      <ThemeProvider theme={theme}>
        <Component {...props} />
      </ThemeProvider>
    );
  };
