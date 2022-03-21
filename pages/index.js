import Header from "../components/Organism/Header";
import styles from "../styles/Home.module.css";
import axios from "axios";
import PostCard from "../components/Molecules/PostCard";
import { useRouter } from "next/router";

export async function getServerSideProps() {
   const response = await axios("https://limitless-forest-49003.herokuapp.com/posts");
   return {
      props: {
         data: response.data,
      },
   };
}

export default function Home({ data }) {
   const router = useRouter();
   const refreshData = () => {
      router.replace(router.asPath);
   };

   const handleDelete = async (id) => {
      const res = await axios(`https://limitless-forest-49003.herokuapp.com/posts/${id}`, {
         method: "DELETE",
      });
      if (res.status === 200) {
         refreshData();
      }
   };

   console.log(data);
   return (
      <div className={styles.container}>
         <Header />
         {/* {data.map((item, idx) => (
            <PostCard
               key={idx}
               index={idx}
               data={item}
               handleDelete={handleDelete}
               refreshData={refreshData}
            />
         ))} */}
      </div>
   );
}
