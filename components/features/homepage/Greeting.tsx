import { FaFire } from "react-icons/fa";
import Slogan from "./Slogan";

export default function Greeting() {
  return (
    <div className="static py-8 mx-10 z-[0] h-screen text-white rounded-3xl bg-gradient-to-r to-main3bg via-main4bg from-main3bg bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-300 ">
      <div className=" mt-8 -full ">
        <div className="justify-center items-center  py-12 ">
          <h1 className="  z-[0] font-bold text-6xl text-center items-center justify-center lg:flex">
            Welcome to
            <span className=" static z-[0] justify-center flex text-7xl lg:ml-5 my-5">
              <FaFire className="  text-main2 " />
              <span className=" font-normal">Fire</span>
              <span className=" font-normal">Desk</span>!
            </span>
          </h1>
        </div>

        <Slogan />
      </div>
    </div>
  );
}
