import Link from "next/link";
import React from "react";

interface TextLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function TextLink({ href, children }: TextLinkProps) {
  return <Link href={href}>{children}</Link>;
}
