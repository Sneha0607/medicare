import { React, useState, useEffect, useRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Radio,
    FormControlLabel, FormControl, FormLabel, RadioGroup, Box, TextField, CssBaseline, MenuItem, InputLabel,
    Select } from '@mui/material';

const Form = () => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleSubmit = () => {

  }

  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <Button onClick={handleClickOpen('paper')}>Complete/Edit your basic details</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Patient Information</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
          >
            <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
              <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
                <Box
                  sx={{
                    my: 4,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          name="Name"
                          required
                          fullWidth
                          label="Name"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Age *</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                      </Grid>
                      <Grid item xs={12}>
                          <FormLabel component="legend">Gender</FormLabel>
                          <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                          </RadioGroup>
                      </Grid>
              
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Form;