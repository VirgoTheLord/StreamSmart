import Image from "next/image";
import Topbar from "./components/Topbar";
import PlayButton from "./components/PlayButton";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <div className="flex-1 w-full relative flex justify-center items-center pt-24">
        <Topbar />

        <h1 className="absolute bottom-2 left-18 z-10 text-[18vh] font-star text-white">
          StreamSmart
        </h1>

        <PlayButton className="absolute bottom-6 right-2 z-20" />
      </div>
    </div>
  );
}
