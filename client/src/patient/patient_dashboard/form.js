import { React, useState, useEffect, useRef } from "react";
import { Grid, TextField } from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const Form = () => {
  const handleSubmit = () => {};

  const [age, setAge] = useState("");
  const [value, setValue] = useState(new Date());

  const handleChangeDate = (newValue) => {
    setValue(newValue);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date desktop"
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Form;
