import {
  getProviders,
  getSession,
  GetSessionParams,
  useSession,
} from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Body from "../components/Body";
import Header from "../components/Header";
import Login from "../components/Login";
import axios from "axios";
import { useRecoilState } from "recoil";
import { docsState } from "../atoms/docs";
import io from "socket.io-client";

export const socketIo = io("http://localhost:3001/");

export default function Home({ providers }) {
  const { data: session } = useSession();

  const [documents, setDocuments] = useRecoilState(docsState);

  if (!session) return <Login providers={providers} />;

  // console.log(session.user[`uid`]);

  const getData = (data) => {
    setDocuments(data);
  };
  const changeData = () => socketIo.emit("initial_data");

  useEffect(() => {
    if (socketIo == null) return;

    session && socketIo.emit("initial_data", session.user[`uid`]);
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
