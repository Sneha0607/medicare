import * as React from 'react';
import { Avatar, Link } from '@mui/material';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Profile Photograph</Title>
      <Avatar
        alt="Remy Sharp"
        src="images/testimonial1.jpg"
        sx={{ width: 100, height: 100 }}
      />
      <br/>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Upload
        </Link>
      </div>
    </React.Fragment>
  );
}