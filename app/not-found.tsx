import Link from "next/link";
import { FaRegFaceTired } from "react-icons/fa6";
import { FaFire } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="items-center ">
      <div className=" h-[40vh] xl:flex text-center justify-center items-center mt-56 xl:mb-5 md:mb-16 sm:mb-10 mb-0 ">
        <div className="justify-center flex">
          <FaRegFaceTired className="xl:mr-24 xl:mb-0 mb-5 text-gray xl:text-[300px] sm:text-[120px] text-[90px]" />
        </div>
        <div className="xl:text-left text-center md:text-6xl sm:text-4xl text-3xl font-bold">
          <h1 className="text-main2 md:text-7xl  sm:text-5xl text-4xl my-2">
            Oops!
          </h1>
          <h2>Something went wrong.</h2>

          <p className=" md:text-3xl sm:text-2xl text-xl font-normal mt-10">
            This page does not exist!
          </p>
        </div>
      </div>
      <div className="flex justify-center self-start">
        <Link
          href="/"
          className=" w-[450px] h-[80px]  md:text-5xl  sm:text-4xl text-3xl flex justify-center items-center text-gray hover:text-main2 transition-all duration-300 "
        >
          <span className="text-xl sm:text-2xl md:text-3xl text-black">
            Go back to
          </span>
          <FaFire className="ml-5" />
          <p className=" tracking-wide">
            <span className="text-black text-medium">Fire</span>Desk
          </p>
        </Link>
      </div>
    </div>
  );
}
