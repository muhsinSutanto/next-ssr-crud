import React, { useEffect, useState } from "react";
import { useStyles } from "./style";
import Link from "next/link";
import { Button, TextField } from "@mui/material";
import axios from "axios";

const PostCard = (props) => {
   const classes = useStyles();

   const { data, index, handleDelete, refreshData } = props;
   const [editForm, setEditForm] = useState(false);
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");

   useEffect(() => {
      setTitle(data.title);
      setContent(data.content);
      //set props here to check the changes on the state
   }, [props]);

   const handleUpdate = async (id, title, content) => {
      const data = {
         title,
         content,
      };
      console.log(data);
      const res = await axios.put(`https://limitless-forest-49003.herokuapp.com/posts/${id}`, data);

      console.log(res);
      if (res.status === 200) {
         refreshData();
         setEditForm(false);
      }
   };

   console.log(title, content);
   return (
      <div className={classes.cardContainer}>
         <div>
            <p>
               Post Number <span>{index + 1}</span>
            </p>
            <Link href={`/post/${data.id}`}>
               <Button>See Detail</Button>
            </Link>
         </div>
         <div className={classes.bottomCard}>
            {!!editForm ? (
               <div>
                  <TextField
                     onChange={(e) => {
                        setTitle(e.target.value);
                     }}
                     variant="outlined"
                     value={title}
                     name="title"
                  />
                  <TextField
                     onChange={(e) => {
                        setContent(e.target.value);
                     }}
                     variant="outlined"
                     value={content}
                  />
               </div>
            ) : (
               <div>
                  <h1>{data.title === null ? "This post has no title" : data.title}</h1>
                  <h1>{data.content === null ? "This post has no title" : data.content}</h1>
               </div>
            )}
         </div>
         <div>
            {!!editForm ? (
               <div>
                  <Button onClick={() => setEditForm(false)}>Cancel</Button>
                  <Button onClick={() => handleUpdate(data.id, title, content)}>Update</Button>
               </div>
            ) : (
               <div>
                  <Button onClick={() => setEditForm(true)}>Edit</Button>
                  <Button onClick={() => handleDelete(data.id)}>Delete</Button>
               </div>
            )}
         </div>
      </div>
   );
};

export default PostCard;
