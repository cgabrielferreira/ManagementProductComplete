import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#800080", // Roxo Agatha All Along
    },
    secondary: {
      main: "#FF4500", // Laranja vibrante
    },
    background: {
      default: "#ffffff", // Fundo escuro
      paper: "#2a2a2a", // Fundo dos cards
    },
    text: {
      primary: "##1a1a1a", // Texto branco
      secondary: "#ffcc00", // Dourado
    },
  },
});

export default theme;
