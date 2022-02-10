import React, { useEffect, useState } from "react";
// import Editor from "../../components/Editor";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Login from "../../components/Login";
import {
  getProviders,
  getSession,
  GetSessionParams,
  useSession,
} from "next-auth/react";

const Editor = dynamic(() => import("../../components/Editor"), { ssr: false });

interface Props {}

const Doc = ({ providers }) => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();

  if (!session) return <Login providers={providers} />;

  return (
    <div>
      <Editor id={id} />
    </div>
  );
};

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

export default Doc;
