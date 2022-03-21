import React from "react";
import style from "../../../styles/Card.module.css";

const DetailCard = ({ post }) => {
   return (
      <div className={style.form}>
         <h3>{post.title}</h3>
         <h2>{post.content}</h2>
         <p>PUBLISHED IN {post.published_at.slice(0, 10)}</p>
      </div>
   );
};

export default DetailCard;
