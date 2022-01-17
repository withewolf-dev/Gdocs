import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import io from "socket.io-client";
import { useSession } from "next-auth/react";

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

  const { data: session } = useSession();

  useEffect(() => {
    const s = io("http://localhost:3001/");
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
      <input
        className="px-4 text-sm text-gray-700 h-9 border-2 rounded-sm outline-none border-blue-700"
        value={title}
        placeholder="title"
        onChange={(e) => {
          settitle(e.target.value);
        }}
      />
      <div id="container" ref={wrapperRef}></div>
    </>
  );
};

export default Editor;
