import { FaFire } from "react-icons/fa";
import Slogan from "./Slogan";
import Image from "next/image";

export default function Greeting() {
  return (
    <div className="static lg:grid grid-cols-2  py-8 mx-10 z-[0] h-screen  text-black rounded-3xl bg-gradient-to-r bg-white ">
      <div className=" mt-32 lg:mt-80 lg:ml-20 ">
        <div className="justify-center items-center  py-12 ">
          <h1 className="z-[0] font-bold text-6xl text-center lg:text-left items-center justify-center ">
            <span className="lg:ml-32">Welcome to</span>
            <span className=" static z-[0] justify-center lg:justify-normal flex xl:text-8xl text-7xl lg:ml-5 my-5">
              <FaFire className="  text-main2 " />
              <span className=" font-normal">Fire</span>
              <span className=" font-normal text-main2 ">Desk</span>!
            </span>
          </h1>
        </div>
        <h1 className=" mx-16 text-2xl md800:my-5 flex  items-centre text-center lg:text-left">
          Reserve your desk and do not worry about place to work!
        </h1>
      </div>

      <div className="flex lg:m-40 justify-center items-center lg:grid grid-cols-1">
        <Image
          src={"/images/desk2.png"}
          alt={"Desk image"}
          width={1000}
          height={1000}
          className=" md:aspect-auto rounded-3xl my-1 md:mx-2 md:my-0 lg:max-w-96 lg:mt-0 mt-20 max-w-64 w-auto h-auto"
        />
      </div>
    </div>
  );
}
