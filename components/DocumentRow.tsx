import React from "react";
import { DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/solid";
import Link from "next/link";
interface Props {}

const DocumentRow = ({ title, id }) => {
  const OnDelete = (e) => {
    e.stopPropagation();
    console.log("DElete");
  };
  return (
    <Link href={`/doc/${id}`}>
      <div className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer">
        <DocumentDuplicateIcon className="h-5 text-blue-500" />
        <p className="flex-grow pl-5 w-12 truncate">{title}</p>
        <p className="pr-5 text-sm">09/10/22</p>
        <TrashIcon
          onClick={OnDelete}
          className="h-5 text-gray-300 hover:text-gray-500"
        />
      </div>
    </Link>
  );
};

export default DocumentRow;
