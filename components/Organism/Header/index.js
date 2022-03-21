import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { TextField } from "@material-ui/core";
import styles from "../../../styles/Header.module.css";

const Header = () => {
   return (
      <div className={styles.container}>
         <div className={styles.bgTop}>
            <h1>
               CRUDS <br /> DASHBOARD
            </h1>
         </div>

         <div className={styles.form}>
            <TextField variant="outlined" placeholder="Post Title" className={styles.input} />
            <TextField variant="outlined" placeholder="Post Content" className={styles.input} />

            <Button variant="contained" endIcon={<AddIcon />}>
               Add Post
            </Button>
         </div>
      </div>
   );
};

export default Header;
