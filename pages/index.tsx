import {
  getProviders,
  getSession,
  GetSessionParams,
  useSession,
} from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import Body from "../components/Body";
import Header from "../components/Header";
import Login from "../components/Login";
import axios from "axios";

export default function Home({ providers }) {
  const { data: session } = useSession();

  if (!session) return <Login providers={providers} />;

  // console.log(session.user[`uid`]);

  useEffect(() => {
    axios
      .delete(
        `http://localhost:3001/doc/${"15845eef-f64d-4a76-99e6-013863a36204"}`
      )
      .then((response) => {
        // handle success
        console.log(response.data);
      });
  }, []);

  return (
    <div>
      <Head>
        <title>Create New Docs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Body />
    </div>
  );
}

export async function getServerSideProps(context: GetSessionParams) {
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      providers,
      session,
    },
  };
}
