import { FaFire } from "react-icons/fa";

export default function RegisterAd() {
const url="bg-[url('/images/blueprint.jpg')]";

  return (
    <div className=" my-40 sm:p-20 lg:p-56 md:p-40 px-5 py-20 bg-center bg-[url('/images/plan.jpg')]  sm:text-3xl text-xl text-center justify-center  mx-10 rounded-3xl bg-cover shadow-2xl  bg-white ">
      <h1 className=" font-bold  grid grid-cols-1 lg:flex xl:text-8xl sm:text-7xl text-4xl lg:text-center items-center justify-center ">
          New to
          <span className=" justify-center static flex  lg:ml-5 my-5">
            <FaFire className="  text-main2 " />
            <span className=" font-normal">Fire</span>
            <span className=" font-normal text-main2 ">Desk</span>
            ?
          </span>
        </h1>
      <p className="  lg:my-40 my-10 sm:my-24 justify-center">
      Create FireDesk account <span className="text-main2">FOR FREE</span> and book place to work in fast and easy way!
      </p>
      <a
          href="/signup"
          className=" my-5 py-2 px-10 bg-gradient-to-r to-main1 via-main2 from-main1 bg-size-200 bg-pos-0 hover:bg-pos-100  text-white uppercase tracking-widest font-light rounded-full transition-all duration-300"
        >
          Sign up
        </a>
    </div>
  );
}
