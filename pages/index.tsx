import {
  getProviders,
  getSession,
  GetSessionParams,
  useSession,
} from "next-auth/react";
import Head from "next/head";
import Body from "../components/Body";
import Header from "../components/Header";
import Login from "../components/Login";

export default function Home({ providers }) {
  const { data: session } = useSession();

  if (!session) return <Login providers={providers} />;
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
