import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useEffect } from "react";

const Home: NextPage = () => {
  const fetchData = async () => {
    const serverAddress = "http://ecommerce/api/posts?perPage=18&page=1";
    try {
      const data = await axios.get(serverAddress);
      console.log("fetched data", data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
};

export default Home;
