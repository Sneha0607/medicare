import * as React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material'

const About = () => {

  return (
    <Paper
      id='about'
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('images/doctors.jpg')`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={process.env.PUBLIC_URL + 'images/doctors.jpg'} alt='Doctors' />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom sx={{ fontFamily: 'Raleway', fontWeight: 'bold', fontStyle: 'italic' }}>
              "Trusted Professionals"
            </Typography>
            <Typography variant="h5" color="inherit" paragraph sx={{ fontFamily: 'Raleway' }}>
              Consult one of the best doctors just by a click!
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default About;