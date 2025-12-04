import Image from "next/image";
import Topbar from "./components/Topbar";
import PlayButton from "./components/PlayButton";
import NotificationsButton from "./components/NotificationsButton";

export default function Home() {
  return (
    <div className="relative min-h-screen flex justify-center items-center bg-white">
      <Topbar />

      <div className="absolute flex justify-center items-center">
        <Image
          src="/background.svg"
          width={1520}
          height={800}
          alt="Background"
          className="object-cover"
        />
      </div>

      <h1 className="absolute bottom-2 left-18 z-10 text-[18vh] font-star text-white">
        StreamSmart
      </h1>

      <PlayButton className="absolute bottom-3 right-2 z-20" />
      <NotificationsButton className="absolute top-2.5 left-2" />
    </div>
  );
}
