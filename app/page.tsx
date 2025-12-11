import Image from "next/image";
import Topbar from "./components/Topbar";
import PlayButton from "./components/PlayButton";
import SVGMaskedCard from "./components/HeroCard";

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Topbar />

      <div className="flex-1 w-full relative flex justify-center items-center">
        <SVGMaskedCard
          src="/bg.jpg"
          alt="Card"
          className="w-40 md:w-56 lg:w-280 -mt-20"
        />

        <h1 className="absolute bottom-4 md:bottom-6 lg:bottom-2 left-4 md:left-8 lg:left-18 z-10 text-[10vh] md:text-[14vh] lg:text-[18vh] font-star text-white">
          StreamSmart
        </h1>

        <PlayButton className="absolute bottom-4 md:bottom-5 lg:bottom-8 right-2 md:right-4 lg:right-4 z-20" />
      </div>
    </div>
  );
}
