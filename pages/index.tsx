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
import { useRecoilState } from "recoil";
import { DocsLoadingState, docsState } from "../atoms/docs";
import io from "socket.io-client";

export const socketIo = io("https://gdoc-server.herokuapp.com/");

export default function Home({ providers }) {
  const { data: session } = useSession();

  const [documents, setDocuments] = useRecoilState(docsState);
  const [docLoading, setdocLoading] = useRecoilState(DocsLoadingState);

  if (!session) return <Login providers={providers} />;

  const getData = (data) => {
    setDocuments(data);
    setdocLoading(false);
  };
  const changeData = () => socketIo.emit("initial_data");

  useEffect(() => {
    if (socketIo == null) return;

    session && socketIo.emit("initial_data", session.user[`uid`]);
    setdocLoading(true);
    socketIo.on("get_data", getData);
    socketIo.on("change_data", changeData);
  }, [socketIo]);

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
