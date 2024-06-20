import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Poppins } from "next/font/google";
import Image from "next/image";

const botUsername = process.env.NEXT_PUBLIC_BOT_USERNAME;
const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Играйте на мобильном устройстве",
  description:
    "Выполняйте задания, получайте награды и соревнуйтесь с друзьями!",
};

export default function DownloadApp() {
  return (
    <div
      className={cn(
        poppins.className,
        "bg-background h-screen grid place-items-center"
      )}
    >
      <div className="flex flex-col space-y-5">
        <h1 className="text-2xl font-bold text-center">Cканируйте для игры</h1>
        <div className="bg-white rounded-2xl select-none size-[250px] mx-auto">
          <Image
            src={"/images/qr-code.svg"}
            width={250}
            height={250}
            alt="qr-code"
          />
        </div>
        <p className="text-center text-xl font-medium">@{botUsername}</p>
      </div>
    </div>
  );
}
