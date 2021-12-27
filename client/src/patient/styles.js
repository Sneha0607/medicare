import { createTheme } from "@mui/material/styles";

const theme = createTheme();

export const container = {
  mt: "12vh",
  ml: "5vw",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #dff6fe 30%, #0095de 90%)",
  backgroundImage: `url('../images/blue2.jpg')`,
  backgroundPosition: "center",
  backgroundRepeat: "repeat-x",
  backgroundSize: "cover",
  [theme.breakpoints.down("md")]: {
    mt: "10vh",
    ml: "10vw",
    maxWidth: "95vw",
  },
  [theme.breakpoints.down("sm")]: {
    ml: "12vw",
    maxWidth: "85vw",
  },
};

export const paper = {
  p: 2,
  display: "flex",
  flexDirection: "column",
};

export const transparentPaper = {
  p: 2,
  display: "flex",
  flexDirection: "column",
  background: "transparent",
};

export const upload = {
  p: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const avatar = {
  width: 200,
  height: 200,
};

export const listItem = {
  border: "2px solid #0d7da5",
  borderRadius: "25px",
  margin: "2px",
  boxShadow: 2,
  backgroundColor: "#e6f7fd",
  "&:hover": {
    backgroundColor: "#d0f0fb",
    boxShadow: 3,
    border: "3px solid #0d7da5",
  },
};

export const typography = { fontWeight: "bold", color: "#063547" };

export const signinGrid = {
  backgroundImage: `url('images/Patient_Signin.jpg')`,
  backgroundRepeat: "no-repeat",
  backgroundColor: (t) =>
    t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export const signupGrid = {
  backgroundImage: `url('images/Patient_Signup.png')`,
  backgroundRepeat: "no-repeat",
  backgroundColor: (t) =>
    t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export const box = {
  my: 8,
  mx: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const controls = {
  top: "auto",
  bottom: 0,
  backgroundColor: "#021117",
  alignItems: "center",
};

export const controlsToolbar = {
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    paddingLeft: "0",
    marginLeft: "0",
  },
};
