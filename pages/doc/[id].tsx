import React, { useEffect, useState } from "react";
// import Editor from "../../components/Editor";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { io } from "socket.io-client";

const Editor = dynamic(() => import("../../components/Editor"), { ssr: false });

interface Props {}

const Doc = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Editor id={id} />
    </div>
  );
};

export default Doc;
