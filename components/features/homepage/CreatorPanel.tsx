import Image from "next/image";
import { FaFire } from "react-icons/fa";

export default function CreatorPanel() {
  return (
    <div className="lg:flex justify-center content-center items-center grid grid-cols-1 my-10 text-white bg-dark">
      <div className=" lg:basis-1/2 grid grid-cols-1 items-center h-screen bg-cover  lg:align-start text-center lg:text-right xl:justify-end ">
        <h1 className=" mx-10 sm:mx-20 md:mx-24 lg:ml-24 2xl:mx-24 2xl:text-8xl xl:text-7xl lg:text-5xl text-6xl sm:text-7xl md:text-8xl lg:text-left items-center lg:justify-start  justify-center font-bold ">
          <span className=" static z-[0] lg:justify-start justify-center flex 2xl:ml-5 my-5 ">
            <FaFire className="  text-main2 " />
            <span className=" font-normal">Fire</span>
            <span className=" font-normal text-main2 lg:mr-10 ">Desk</span>
          </span>
          <span className="ml-5">Creator</span>
        </h1>
        <h2 className=" items-center mx-10 sm:mx-20 md:mx-24 justify-center  2xl:mx-32 text-center lg:text-left xl:text-2xl lg:text-xl text-2xl mb-20 ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic atque
          veniam nisi iure molestias voluptate fuga deleniti ipsa aperiam.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic atque
          veniam nisi iure molestias voluptate fuga deleniti ipsa aperiam.
        </h2>
      </div>

<div className=" w-full justify-self-center items-center place-content-center flex lg:basis-1/2 max-w-96 lg:max-w-none  m-10 ">
      <Image
        src="/images/image2.png"
        alt="blueprint"
        width={1000}
        height={1000}
        className="rounded-3xl m-5 md:m-0 "
      />
      </div>
      </div>

  );
}
