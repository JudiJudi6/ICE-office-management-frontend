import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-dark text-base p-8 pt-12 text-white ">
      <p className="text-center">Authors</p>
      <div className="flex justify-center items-center gap-3 mb-10 pt-3">
        <Link
          href="https://github.com/JudiJudi6"
          className="hover:text-main2 transition-colors duration-300"
        >
          Łukasz Michnik
        </Link>
        <span className="block w-1 h-1 rounded-full bg-bgWhite1"></span>
        <Link
          href="https://github.com/mnaboo"
          className="hover:text-main2 transition-colors duration-300"
        >
          Maciej Nabożny
        </Link>
        <span className="block w-1 h-1 rounded-full bg-bgWhite1"></span>
        <Link
          href="https://github.com/jmisina"
          className="hover:text-main2 transition-colors duration-300"
        >
          Jakub Misina
        </Link>
        <span className="block w-1 h-1 rounded-full bg-bgWhite1"></span>
        <Link
          href="https://github.com/Warrioll"
          className="hover:text-main2 transition-colors duration-300"
        >
          Karol Nowak
        </Link>
        <span className="block w-1 h-1 rounded-full bg-bgWhite1"></span>
        <Link
          href="https://github.com/Michalooooooo"
          className="hover:text-main2 transition-colors duration-300"
        >
          Michał Niziołek
        </Link>
      </div>
      <p className="text-center">
        Copyright &copy;2024 FireDesk. All rights reserved.
      </p>
    </div>
  );
}
