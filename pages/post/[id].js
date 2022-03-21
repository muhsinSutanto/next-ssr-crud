import React from "react";
import Header from "../../components/Organism/Header";
import axios from "axios";

export async function getServerSideProps({ params }) {
   const response = await axios(`https://limitless-forest-49003.herokuapp.com/posts/${params.id}`);
   return {
      props: {
         post: response.data,
      },
   };
}

const Detail = ({ post }) => {
   return (
      <div>
         <Header />
         <h1>this is {post.id}</h1>
      </div>
   );
};

export default Detail;
