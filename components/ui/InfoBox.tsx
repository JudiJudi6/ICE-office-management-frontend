import Image from "next/image";
//import zdj from "/image.png";

export default function InfoBox({ boxTitle, text, image }: BoxTitle) {
  return (
    <div className="flex shadow-xl my-8 mx-4 p-1 rounded-3xl w-1/2">
      <div className="  p-8 bg-gradient-to-r to-main1 via-main2 from-main1 bg-size-200 bg-pos-0 hover:bg-pos-100 py-2 text-white  tracking-widest font-light transition-all duration-300 rounded-3xl">
        <h1 className="font-bold text-3xl">{boxTitle}</h1>
        <p className="text-1xl">{text}</p>
      </div>
      <Image
        src={image}
        alt={image}
        width={391}
        height={273}
        className="rounded-3xl mx-5"
      />
    </div>
  );
}

interface BoxTitle {
  boxTitle: string;
  text: string;
  image: string;
}
