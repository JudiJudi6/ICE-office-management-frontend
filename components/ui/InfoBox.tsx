import Image from "next/image";
//import zdj from "/image.png";

export default function InfoBox({
  boxTitle = "",
  text = "",
  showButton = false,
  hrefButton = "",
  titleButton = "",
  showImg = false,

  srcImg = "",
}: boxText) {
  const image = srcImg || "";

  const isButton = showButton ? (
    <div className=" md:w-full md:h-full p-8 py-2 text-white text-center content-center font-light  ">
      <h1 className="font-bold text-3xl">{boxTitle}</h1>
      <p className="text-1xl">{text}</p>
      <div className=" flex md:grid grid-cols-1 justify-center">
        <a href={hrefButton} className=" my-3">
          <button className=" w-full p-2 h-full font-normal text-main1 hover:text-main2 transition-colors duration-300 bg-white uppercase rounded-full">
            {titleButton}
          </button>
        </a>
        <></>
      </div>
    </div>
  ) : (
    <div className="  md:w-full md:h-full p-8 py-2  text-white content-center font-light  ">
      <h1 className="font-bold text-3xl">{boxTitle}</h1>
      <p className="text-1xl">{text}</p>
    </div>
  );

  const isImg = showImg ? (
    <div className=" flex justify-self-end place-content-center  ">
      <Image
        src={image}
        alt={image}
        width={1000}
        height={1000}
        className=" md:aspect-auto rounded-3xl my-1 md:mx-2 md:my-0 max-w-80 max-h-64 w-auto h-auto"
      />
    </div>
  ) : (
    <></>
  );

  return (
    <div className=" my-3 xl:mx-3 mx-2 w-full h-full  shadow-xl  rounded-3xl bg-gradient-to-r to-main1 via-main2 from-main1 bg-size-200 bg-pos-0 hover:bg-pos-100 py-2  tracking-widest font-light transition-all duration-300">
      <div className="md:flex w-full h-full grid-cols-2   items-center  ">
        {isButton}
        {isImg}
      </div>
    </div>
  );
}

interface boxText {
  boxTitle: string;
  text: string;
  showButton: boolean;
  hrefButton?: string;
  titleButton?: string;
  showImg: boolean;
  srcImg?: string;
}
