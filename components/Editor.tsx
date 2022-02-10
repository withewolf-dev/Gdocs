import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import io from "socket.io-client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { LogoutIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

interface Props {}

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const SAVE_INTERVAL_MS = 2000;
const Editor = ({ id }) => {
  const [socket, setsocket] = useState<any>();
  const [quill, setquill] = useState<any>();
  const [title, settitle] = useState("");

  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    const s = io("https://gdoc-server.herokuapp.com/");
    setsocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.once("load-document", (document) => {
      quill.setContents(document.data);

      settitle(document.title);
      quill.enable();
    });

    session &&
      socket.emit("get-document", { id, userId: session.user[`uid`], title });
  }, [socket, quill, id]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta) => {
      quill.updateContents(delta);
      // settitle("");
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const interval = setInterval(() => {
      socket.emit("save-document", { data: quill.getContents(), title });
    }, SAVE_INTERVAL_MS);
    return () => {
      clearInterval(interval);
    };
  }, [socket, quill, title]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);
    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText("Loading....");
    setquill(q);
  }, []);
  return (
    <>
      <header className="flex justify-between items-center p-3 pb-1 ">
        <Image
          onClick={(e) => {
            e.preventDefault();
            router.push("/");
          }}
          alt="image"
          src={
            "https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png"
          }
          height={50}
          width={50}
          className="cursor-pointer"
        />
        <input
          className="px-4 text-sm text-gray-700 h-8 border-2 rounded-md outline-none border-gray-200"
          value={title}
          placeholder="title"
          onChange={(e) => {
            settitle(e.target.value);
          }}
        />
        <div className="flex-grow px-2">
          <div className="flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-500">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
          </div>
        </div>
        <button className="bg-blue-500 w-28 p-2 rounded-md text-zinc-200 text-sm hover:bg-blue-600 hover:text-white">
          share
        </button>
      </header>

      <div id="container" ref={wrapperRef}></div>
    </>
  );
};

export default Editor;
