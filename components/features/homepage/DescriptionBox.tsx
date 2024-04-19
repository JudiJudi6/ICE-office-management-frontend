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
    icon = <FaRegQuestionCircle />;
  }
  if (image === "RiShakeHandsLine") {
    icon = <RiShakeHandsLine />;
  }
  if (image === "FiTool") {
    icon = <FiTool />;
  }

  return (
    <div className=" m-3 w-full h-96 p-10 shadow-2xl border-2 border-main1 text-black bg-white rounded-3xl font-light content-center text-center">
      <h1 className="font-bold text-3xl ">{boxTitle}</h1>
      <p className="text-1xl text-black">{text}</p>
      <span className=" mt-10 text-8xl flex justify-self-end place-content-center text-main2 ">
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
