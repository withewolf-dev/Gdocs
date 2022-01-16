import React from "react";
import { DocumentDuplicateIcon } from "@heroicons/react/solid";
interface Props {}

const DocumentRow = (props: Props) => {
  return (
    <div className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer">
      <DocumentDuplicateIcon className="h-5 text-blue-500" />
      <p className="flex-grow pl-5 w-12 truncate">This is presentation</p>
      <p className="pr-5 text-sm">09/10/22</p>
    </div>
  );
};

export default DocumentRow;
