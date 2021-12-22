export const container = {
  mt: "12vh",
  ml: "5vw",
  height: "100vh",
  backgroundImage: `url('../images/blue2.jpg')`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
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
