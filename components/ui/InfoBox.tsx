import Image from "next/image";
//import zdj from "/image.png";

export default function InfoBox({ boxTitle, text, image }: BoxTitle) {
  const ratio = 20;

  return (
    <div className=" w-full shadow-xl my-8 mx-4 p-1 rounded-3xl flex ">
      <div className="md:flex justify-center">
        <div className=" p-8 bg-gradient-to-r to-main1 via-main2 from-main1 bg-size-200 bg-pos-0 hover:bg-pos-100 py-2 text-white  tracking-widest font-light transition-all duration-300 rounded-3xl">
          <h1 className="font-bold text-3xl">{boxTitle}</h1>
          <p className="text-1xl">{text}</p>
        </div>
        <Image
          src={image}
          alt={image}
          width={1000}
          height={1000}
          layout="responsive"
          className="rounded-3xl mx-1 max-w-64 w-auto h-auto"
        />
      </div>
    </div>
  );
}

interface BoxTitle {
  boxTitle: string;
  text: string;
  image: string;
}
