import Image from "next/image";
import { FaFire } from "react-icons/fa";

export default function CreatorPanel() {
  return (
    <div className="xl:flex my-10 bg-white">
      <div className=" basis-1/2 py-40 h-screen bg-cover place-items-end align-end text-right xl:justify-end ">
        <h1 className=" font-bold xl:text-8xl text-7xl lg:text-left items-center lg:justify-end mx-20">
          <span className=" static z-[0]  flex  lg:ml-5 my-5">
            <FaFire className="  text-main2 " />
            <span className=" font-normal">Fire</span>
            <span className=" font-normal text-main2 mr-10 ">Desk</span>
          </span>
          <span className="ml-10">Creator</span>
        </h1>
        <h2 className=" lg:m-32  2xl:mr-64 text-left text-2xl md800:my-5 ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic atque
          veniam nisi iure molestias voluptate fuga deleniti ipsa aperiam.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic atque
          veniam nisi iure molestias voluptate fuga deleniti ipsa aperiam.
        </h2>
      </div>

      <Image
        src="/images/image2.png"
        alt="blueprint"
        width={1000}
        height={1000}
        className=" basis-1/2 rounded-3xl m-10"
      />
    </div>
  );
}
