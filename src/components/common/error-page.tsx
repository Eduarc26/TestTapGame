import React from "react";
import { RefreshCw } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="bg-black h-screen grid place-items-center">
      <div>
        <h1 className="text-2xl font-bold text-center">
          Извините, что-то <br />
          пошло не так
        </h1>
        <p className="mt-1.5 text-[#ddd] text-sm text-center font-medium">
          Повторите попытку позже
        </p>
        <a
          className="bg-white/10 block mx-auto mt-7 py-3 px-5 rounded-full w-fit"
          href={"/"}
        >
          <RefreshCw size={18} strokeWidth={2.5} />
        </a>
      </div>
    </div>
  );
}
