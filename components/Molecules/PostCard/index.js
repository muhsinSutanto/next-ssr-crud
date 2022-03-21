import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TextField, TextareaAutosize } from "@mui/material";
import axios from "axios";
import styles from "../../../styles/Card.module.css";
import Swal from "sweetalert2";
import { BASE_URL } from "../../../const/config";
import { ENDPOINTS } from "../../../const/endpoints";

const PostCard = (props) => {
   const { data, index, handleDelete, refreshData } = props;
   const [editForm, setEditForm] = useState(false);
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");

   useEffect(() => {
      setTitle(data.title);
      setContent(data.content);
   }, [props]);

   const handleUpdate = async (id) => {
      const data = {
         title,
         content,
      };
      const res = await axios.put(`${BASE_URL}/${ENDPOINTS.POST_LIST}/${id}`, data);
      if (res.status === 200) {
         Swal.fire({
            icon: "success",
            text: "The post is updated",
            showConfirmButton: false,
            timer: 3000,
         });
         refreshData();
         setEditForm(false);
      }
   };

   return (
      <div className={styles.container}>
         <div>
            {!!editForm ? (
               <div>
                  <TextField
                     onChange={(e) => {
                        setTitle(e.target.value);
                     }}
                     variant="outlined"
                     label="Title"
                     value={title}
                     name="title"
                     className={styles.formUpdate}
                  />
                  <TextareaAutosize
                     onChange={(e) => {
                        setContent(e.target.value);
                     }}
                     aria-label="minimum height"
                     minRows={3}
                     label="Content"
                     className={styles.formUpdate}
                     value={content}
                  />
                  <div style={{ display: "flex" }}>
                     <p onClick={() => handleUpdate(data.id)}>Update</p>
                     <p onClick={() => setEditForm(false)}>Cancel</p>
                  </div>
               </div>
            ) : (
               <div>
                  <h3>{data.title === null ? "-" : data.title}</h3>
                  <h2>{data.content === null ? "......." : data.content}</h2>
                  <div style={{ display: "flex" }}>
                     <Link href={`/post/${data.id}`}>
                        <p>See Detail</p>
                     </Link>
                     <p onClick={() => setEditForm(true)}>Edit</p>
                     <p onClick={() => handleDelete(data.id)}>Delete</p>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default PostCard;
