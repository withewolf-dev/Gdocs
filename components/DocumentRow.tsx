import React, { useEffect, useState } from "react";
import { DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/solid";
import Link from "next/link";
import io, { Socket } from "socket.io-client";
import { socketIo } from "../pages";

const DocumentRow = ({ title, id }) => {
  const [triggerIo, settriggerIo] = useState(false);
  const [socket, setsocket] = useState<any>();

  useEffect(() => {
    const s = io("https://gdoc-server.herokuapp.com/");
    setsocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  const OnDelete = (e) => {
    e.stopPropagation();
    socketIo.emit("delete", id);
  };
  return (
    <Link href={`/doc/${id}`}>
      <div className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer">
        <DocumentDuplicateIcon className="h-5 text-blue-500" />
        <p className="flex-grow pl-5 w-12 truncate">{title}</p>
        <p className="pr-5 text-sm"></p>
        <TrashIcon
          onClick={OnDelete}
          className="h-5 text-gray-300 hover:text-gray-500"
        />
      </div>
    </Link>
  );
};

export default DocumentRow;
