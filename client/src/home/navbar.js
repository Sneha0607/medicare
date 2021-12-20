import * as React from "react";
import PropTypes from "prop-types";
import { Link, Toolbar, Typography } from "@mui/material";

const Navbar = (props) => {
  const { sections } = props;

  return (
    <React.Fragment id="">
      {/* TITLE */}
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "#3284be",
          color: "#ffffff",
        }}
      >
        <Typography
          variant="h3"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1, fontWeight: "bold", fontFamily: "Raleway" }}
        >
          MEDICARE
        </Typography>
      </Toolbar>

      {/* LINKS TO VARIOUS SECTIONS */}
      <Toolbar
        component="nav"
        variant="dense"
        sx={{
          justifyContent: "space-between",
          overflowX: "auto",
          backgroundColor: "#d7e8f4",
        }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="h6"
            href={section.url}
            sx={{
              p: 1,
              flexShrink: 0,
              textDecoration: "none",
              color: "#3284be",
              fontWeight: "bold",
              textTransform: "uppercase",
              fontFamily: "Raleway",
              "&:hover": {
                backgroundColor: "#3284be",
                color: "#ffffff",
              },
            }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
};

export default Navbar;
