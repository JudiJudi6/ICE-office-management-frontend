export default function Slogan() {
  return (
    <div className=" md800:flex justify-center ">
      <h1 className=" mx-16 text-xl md800:my-5 flex justify-center items-centre text-center">
        Reserve your desk and do not worry about place to work!
      </h1>

      <div className="flex justify-center">
        <button className="  m-4  w-40 h-10  shadow-md bg-white py-2 text-main1 uppercase tracking-widest font-light rounded-full transition-all duration-300">
          <a href="/login">Log in</a>
        </button>
      </div>
    </div>
  );
}
