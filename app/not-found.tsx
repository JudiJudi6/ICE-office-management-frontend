import Link from "next/link";
import { FaRegFaceTired } from "react-icons/fa6";
import { FaFire } from "react-icons/fa";
import { WiSmoke } from "react-icons/wi";

export default function NotFound() {
  return (
    <div className="grid grid-cols-1 justify-center h-screen w-screen">
      <div className="  flex justify-center items-center ">
        <div className="text-right text-6xl  font-bold">
          <h1 className="text-main2 text-7xl my-2">Oops!</h1>
          <h2>Something went cold.</h2>

          <p className="text-3xl font-normal mt-10">
            This page does not exist!
          </p>
        </div>
        <WiSmoke className=" text-gray text-[500px]" />
      </div>
      <Link
        href="/"
        className=" px-5 text-5xl flex justify-center items-center text-gray hover:text-main2 transition-all duration-300 "
      >
        <span className="text-3xl text-black">Go back to</span>
        <FaFire className="ml-5" />
        <p className="text-5xl tracking-wide">
          <span className="text-black text-medium">Fire</span>Desk
        </p>
      </Link>
    </div>
  );
}
