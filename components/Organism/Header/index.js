import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@material-ui/core";
import styles from "../../../styles/Header.module.css";
import axios from "axios";
import { Link } from "@mui/material";
import Swal from "sweetalert2";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { BASE_URL } from "../../../const/config";
import { ENDPOINTS } from "../../../const/endpoints";

const Header = ({ refreshData, isDetail }) => {
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [titleValid, setTitleValid] = useState(false);
   const [contValid, setContValid] = useState(false);

   const handleSubmit = async (id) => {
      if (!title.length && !content.length) {
         setTitleValid(true);
         setContValid(true);
      } else {
         const data = {
            title,
            content,
         };
         const res = await axios.post(`${BASE_URL}/${ENDPOINTS.POST_LIST}`, data);
         if (res.status === 200) {
            Swal.fire({
               icon: "success",
               text: "New post is added",
               showConfirmButton: false,
               timer: 3000,
            });
            setTitle("");
            setContent("");
            refreshData();
         }
      }
   };

   return (
      <div className={styles.container}>
         <div className={styles.bgTop}>
            <h1>
               CONTENT <br /> DASHBOARD
            </h1>
            {!!isDetail && (
               <div className={styles.breadcrumb}>
                  <Link href={"/"}>
                     <p>Home {`   `}</p>
                  </Link>
                  <KeyboardArrowRightIcon sx={{ fontSize: 20 }} />
                  <p>Post Detail</p>
               </div>
            )}
         </div>
         {!isDetail && (
            <div className={styles.form}>
               <TextField
                  error={titleValid}
                  onChange={(e) => {
                     setTitle(e.target.value);
                     setTitleValid(false);
                  }}
                  variant="outlined"
                  placeholder="Post Title"
                  className={styles.input}
                  value={title}
               />
               <TextField
                  error={contValid}
                  onChange={(e) => {
                     setContent(e.target.value);
                     setContValid(false);
                  }}
                  variant="outlined"
                  placeholder="Post Content"
                  className={styles.input}
                  value={content}
               />
               {!!titleValid || !!contValid ? <p>Title and Content Must Be Filled</p> : null}

               <Button onClick={handleSubmit} variant="contained" endIcon={<AddIcon />}>
                  Add Post
               </Button>
            </div>
         )}
      </div>
   );
};

export default Header;
