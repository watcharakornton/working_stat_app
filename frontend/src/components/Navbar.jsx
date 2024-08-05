import { SearchIcon } from "@heroicons/react/solid";
import { TextInput } from "@tremor/react";
import React from "react";
import {
  ChartBarIcon,
} from "@heroicons/react/solid";

const Navbar = () => {
  return (
    <div
      id="top"
      className="relative w-full sm:flex justify-center items-center p-2"
    >
      <h1 className="font-bold text-xl text-gray-300 py-5">Working Stats App</h1>
    </div>
  )
}

export default Navbar;
