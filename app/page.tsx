import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1>Home</h1>
      <Link href="/login">Log in</Link>
    </div>
  );
}
