import React, { ReactElement } from "react";
import { SearchIcon } from "@heroicons/react/solid";
interface Props {}

function Search({}: Props): ReactElement {
  return (
    // <div>
    //   <input placeholder="type" />
    // </div>
    <div className="box w-[900px]">
      <div className="box-wrapper">
        <div className=" bg-white rounded flex items-center w-full p-3 shadow-sm border border-gray-200">
          <button className="outline-none focus:outline-none">
            <SearchIcon className=" w-5 text-gray-600 h-5 cursor-pointer" />
          </button>
          <input
            type="search"
            name=""
            placeholder="search for Document"
            x-model="q"
            className="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
