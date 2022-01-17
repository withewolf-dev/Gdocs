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
import { useRecoilState } from "recoil";
import { docsState } from "../atoms/docs";

export default function Home({ providers }) {
  const { data: session } = useSession();

  const [documents, setDocuments] = useRecoilState(docsState);

  if (!session) return <Login providers={providers} />;

  // console.log(session.user[`uid`]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/doc/${session.user[`uid`]}`)
      .then((response) => {
        // handle success
        console.log(response.data);
        setDocuments(response.data);
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
