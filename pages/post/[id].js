import React from "react";
import Header from "../../components/Organism/Header";
import axios from "axios";
import styles from "../../styles/Home.module.css";
import DetailCard from "../../components/Molecules/DetailCard";
import { BASE_URL } from "../../const/config";
import { ENDPOINTS } from "../../const/endpoints";

export async function getServerSideProps({ params }) {
   const response = await axios(`${BASE_URL}/${ENDPOINTS.POST_LIST}/${params.id}`);
   return {
      props: {
         post: response.data,
      },
   };
}

const Detail = ({ post }) => {
   return (
      <div className={styles.container}>
         <Header isDetail={true} />
         <DetailCard post={post} />
      </div>
   );
};

export default Detail;
