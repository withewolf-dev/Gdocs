import Image from "next/image";
import React from "react";
import { DotsVerticalIcon, FolderIcon } from "@heroicons/react/solid";

import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import DocumentRow from "./DocumentRow";
import { useRecoilState, useRecoilValue } from "recoil";
import { DocsLoadingState, docsState } from "../atoms/docs";

interface Props {}

const Body = () => {
  const router = useRouter();

  const [documents, setDocuments] = useRecoilState(docsState);
  const docsLoadingState = useRecoilValue(DocsLoadingState);

  const newDoc = (e) => {
    e.preventDefault();
    router.push(`/doc/${uuidv4()}`);
  };

  return (
    <div>
      <section className="bg-[#F8F9FA] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className=" flex items-center justify-between py-6">
            <h2 className="text-gray-700 text-lg">Start new document</h2>
            <button>
              <DotsVerticalIcon className="h-4" />
            </button>
          </div>
          <div
            onClick={newDoc}
            className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700"
          >
            <Image
              alt="image"
              layout="fill"
              src={
                "https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
              }
            />
          </div>
          <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">blank</p>
        </div>
      </section>
      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-gray-700 text-sm">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="mr-12">Date Created </p>
            <FolderIcon className="h-4" />
          </div>
          {!docsLoadingState &&
            documents.map((e) => (
              <DocumentRow title={e.title} id={e._id} key={e._id} />
            ))}
          {docsLoadingState && (
            <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
              <div className="flex flex-col space-y-3">
                <div className="w-80 bg-gray-300 h-6 rounded-md "></div>
                <div className="w-80 bg-gray-300 h-6 rounded-md "></div>
                <div className="w-80 bg-gray-300 h-6 rounded-md "></div>
                <div className="w-80 bg-gray-300 h-6 rounded-md "></div>
                <div className="w-80 bg-gray-300 h-6 rounded-md "></div>
                <div className="w-80 bg-gray-300 h-6 rounded-md "></div>
              </div>
            </div>
          )}
          {!docsLoadingState && documents.length === 0 && (
            <div className="flex  flex-row items-center h-full justify-center space-x-5">
              <h1 className="text-xl">NO DOCUMENT CREATED TILL DATE</h1>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Body;
