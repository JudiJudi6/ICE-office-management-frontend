export default function RegisterAd() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 sm:gap-7 px-6 py-10 sm:py-16 lg:py-24 max-w-xl mx-auto">
      <h3 className="text-3xl text-center font-bold">
        Manage your office & Save time
      </h3>
      <p className="text-lg text-center">
        Create FireDesk account <span className="text-main2">for free</span> and
        book place to work in fast and easy way!
      </p>
      <a
        href="/signup"
        className="justify-center flex py-2 px-10 min-w-40 bg-gradient-to-r to-main1 via-main2 from-main1 bg-size-200 bg-pos-0 hover:bg-pos-100  text-white uppercase tracking-widest rounded-full transition-all duration-300"
      >
        Sign up
      </a>
    </div>
  );
}
