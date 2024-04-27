import { FaRegQuestionCircle } from "react-icons/fa";
import { RiShakeHandsLine } from "react-icons/ri";
import { FiTool } from "react-icons/fi";

export default function InfoBox({
  boxTitle = "",
  text = "",
  image = "",
}: boxText) {
  let icon;
  if (image === "FaRegQuestionCircle") {
    icon = <FaRegQuestionCircle  />;
  }
  if (image === "RiShakeHandsLine") {
    icon = <RiShakeHandsLine />;
  }
  if (image === "FiTool") {
    icon = <FiTool />;
  }

  const anim="transitions-all duration-300 hover:scale-110";

  return (
    <div className="static z-0    2xl:h-[60vh] h-[80vh] 2xl:p-10 p-10 shadow-2xl border-2 border-main1 text-black bg-white rounded-3xl font-light content-center text-center">
      <h1 className="font-bold 2xl:text-3xl text-4xl ">{boxTitle}</h1>
      <p className=" text-base md:text-lg text-black mt-8">{text}</p>
      <span className=" 2xl:mt-10 md:text-7xl flex  place-content-center mt-10 text-6xl text-main2 ">
        {icon}
      </span>
    </div>
  );
}

interface boxText {
  boxTitle: string;
  text: string;
  image: string;
}
