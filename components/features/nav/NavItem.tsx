import Link from "next/link";
import React from "react";

interface NavItemProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}

export default function NavItem({ href, title, icon }: NavItemProps) {
  return (
    <Link
      href={href}
      className="w-full hover:bg-bgWhite1 rounded-lg  py-3 px-4 hover:text-main2 transition-colors duration-300"
    >
      <p className="flex gap-4 justify-start items-center ">
        <span className="text-2xl">{icon}</span>
        {title}
      </p>
    </Link>
  );
}
