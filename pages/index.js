import Header from "../components/Organism/Header";
import styles from "../styles/Home.module.css";
import axios from "axios";
import PostCard from "../components/Molecules/PostCard";
import { Alert, AlertTitle } from "@mui/material";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { BASE_URL } from "../const/config";
import { ENDPOINTS } from "../const/endpoints";
import fetch from "isomorphic-fetch";

export async function getServerSideProps() {
   const response = await fetch(`${BASE_URL}/${ENDPOINTS.POST_LIST}`);
   const errorCode = response.status !== 200 ? response.status : false;
   const rawData = response.status !== 200 ? false : response.data;
   console.log(response.status);
   return {
      props: {
         data: rawData,
         errorCode: errorCode,
      },
   };
}

export default function Home({ errorCode, data }) {
   const router = useRouter();
   const refreshData = () => {
      router.replace(router.asPath);
   };

   const handleDelete = async (id) => {
      const res = await axios(`${BASE_URL}/${ENDPOINTS.POST_LIST}/${id}`, {
         method: "DELETE",
      });
      if (res.status === 200) {
         Swal.fire({
            icon: "success",
            text: "The post is deleted",
            showConfirmButton: false,
            timer: 3000,
         });
         refreshData();
      }
   };

   if (errorCode) {
      return (
         <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {errorCode} — Data not found. API doesn't work!!!
         </Alert>
      );
   }

   return (
      <div className={styles.container}>
         <Header refreshData={refreshData} />
         {data.map((item, idx) => (
            <PostCard
               key={idx}
               index={idx}
               data={item}
               handleDelete={handleDelete}
               refreshData={refreshData}
            />
         ))}
      </div>
   );
}
