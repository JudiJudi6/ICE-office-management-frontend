import Image from "next/image";
import { FaFire } from "react-icons/fa";

export default function CreatorPanel() {
  return (
    <div className=" bg-dark py-6">
      <div className="flex flex-col md800:flex-row justify-center items-center text-white max-w-7xl mx-auto">
        <div className="mb-5  md800:w-1/2">
          <h1 className="text-5xl font-bold flex justify-center items-center flex-col gap-3 my-10">
            <span className="flex justify-center items-center gap-2">
              <FaFire className="text-main2 " />
              <span>
                <span className="font-normal">Fire</span>
                <span className="font-normal text-main2 lg:mr-10 ">Desk</span>
              </span>
            </span>
            <span className="text-center">Creator</span>
          </h1>
          <h2 className=" items-center mx-10 md800:p-8 justify-center  text-center text-base sm:">
            FireDesk&apos;s 3D office creator empowers users to design their
            ideal workspace with ease. With intuitive drag-and-drop
            functionality, users can effortlessly arrange desks, chairs, and
            other office elements to create a customized layout. The creator
            tool provides a realistic visualization of the office environment,
            allowing for precise planning and optimization of space. Whether
            rearranging existing setups or designing from scratch,
            FireDesk&apos;s creator simplifies the process, ensuring efficient
            and ergonomic workspaces tailored to individual needs.
          </h2>
        </div>

        <div className="relative my-5 md800:w-1/2 px-10 mx-auto">
          <Image
            src="/images/creator.jpg"
            alt="blueprint"
            width={400}
            height={400}
            className="rounded-3xl  "
          />
          <Image
            src="/images/creator2.jpg"
            alt="blueprint"
            width={400}
            height={400}
            className="rounded-3xl sm:ml-20 md800:ml-0 xl:ml-20 mt-4"
          />
        </div>
      </div>
    </div>
  );
}
