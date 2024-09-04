import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-20 items-center p-24 w-screen">
      <Navbar />
      <div className="between h-full w-full">
        <h1 className=" w-1/2 font-bold text-[92px] leading-[5rem]">A new era of e-commerce payment</h1>
        <div className="w-1/2 center">
          <img src="/hero.png" alt="hero" />
        </div>
      </div>
    </main>
  );
}
