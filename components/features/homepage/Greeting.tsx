import { FaFire } from "react-icons/fa";
import Image from "next/image";

export default function Greeting() {

  const url=" bg-center bg-[url('/images/plan.jpg')]"

  return (
    <div className="h-screen pb-10 ">
    <div className="static  lg:grid grid-cols-2 h-full py-8 mx-10 z-[0]  shadow-2xl  text-black rounded-3xl bg-cover bg-white">
      <div className=" mt-[25vh] lg:mt-0 place-content-center justify-center items-center lg:ml-20 ">
        <div className="justify-center items-center  py-12 ">
          <h1 className="z-[0] font-bold xl:text-6xl sm:text-5xl text-4xl text-center lg:text-left items-center justify-center ">
            <span className="xl:ml-32  lg:ml-24">Welcome to</span>
            <span className=" static z-[0] justify-center lg:justify-normal flex xl:text-8xl text-5xl sm:text-7xl lg:ml-5 my-5">
              <FaFire className="  text-main2 " />
              <span className=" font-normal">Fire</span>
              <span className=" font-normal text-main2 ">Desk</span>!
            </span>
          </h1>
        </div>
        <h2 className=" justify-center mx-10 sm:mx-20 md:mx-32 xl:ml-32 lg:ml-24 lg:mx-0 2xl:mr-20 sm:text-2xl text-xl md800:my-5 flex items-centre text-center lg:text-left">
          Reserve your desk and do not worry about place to work!
        </h2>

        <a
          href="/login"
          className="justify-center flex md:grid my-5 py-2 mx-10 sm:mx-32 md:mx-40 px-10 min-w-40 lg:ml-24 xl:ml-32 bg-gradient-to-r to-main1 via-main2 from-main1 bg-size-200 bg-pos-0 hover:bg-pos-100  text-white uppercase tracking-widest font-light rounded-full transition-all duration-300"
        >
          Log in
        </a>
      </div>

      <div className="flex lg:m-40 justify-center items-center lg:grid grid-cols-1">
        <Image
          src={"/images/desk2.png"}
          alt={"Desk image"}
          width={1000}
          height={1000}
          className=" lg:grid grid-flow-col hidden md:aspect-auto rounded-3xl my-1 md:mx-2 md:my-0 2xl:max-w-96 xl:max-w-80 lg:max-w-64 lg:mt-0 mt-20 max-w-64 w-auto h-auto"
        />
      </div>
    </div>
    </div>
  );
}
