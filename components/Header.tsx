import React from "react";
import { LogoutIcon, MenuIcon, SearchIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

interface Props {}

const Header = (props: Props) => {
  const { data: session } = useSession();

  return (
    <div className="sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white">
      <MenuIcon className="h-5" />
      <Image
        alt="iamge"
        src={
          "https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png"
        }
        height={50}
        width={50}
      />
      <h1
        className="ml-2 text-gray-700 text-2xl
      "
      >
        Docs
      </h1>
      <div className=" mx-5  md:mx-20 flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md">
        <SearchIcon className="h-5 text-gray-400" />
        <input
          type={"text"}
          placeholder="Search"
          className="flex-grow px-5 text-base bg-transparent outline-none"
        />
      </div>
      <img
        alt="image"
        src={session.user?.image}
        className="h-10 w-10 rounded-full object-fit cursor-pointer"
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          signOut();
        }}
        className="bg-blue-600 w-24 p-2 rounded-md text-white text-sm hover:bg-blue-700 hover:text-white ml-2"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
