import { createTheme } from "@mui/material/styles";

const theme = createTheme();

export const container = {
  mt: "12vh",
  ml: "5vw",
  height: "100vh",
  backgroundImage: `url('../images/blue2.jpg')`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  [theme.breakpoints.down("md")]: {
    mt: "8vh",
    ml: "10vw",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  [theme.breakpoints.down("md")]: {
    ml: "10vw",
  },
};

export const paper = {
  p: 2,
  display: "flex",
  flexDirection: "column",
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
  border: "1px solid",
  margin: "2px",
};

export const confirmButton = {
  backgroundColor: "#009900",
  "&:hover": {
    backgroundColor: "#006600",
  },
};

export const cancelButton = {
  backgroundColor: "#e60000",
  "&:hover": {
    backgroundColor: "#b30000",
  },
};

export const signinGrid = {
  backgroundImage: `url('images/Doctor_Signin.png')`,
  backgroundRepeat: "no-repeat",
  backgroundColor: (t) =>
    t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export const signupGrid = {
  backgroundImage: `url("images/Doctor_Signup.jpg")`,
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
