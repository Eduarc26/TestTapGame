import { Metadata } from "next";
import { RefreshCw } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not found",
  description: "The page you're looking for doesn't exist",
};

export default function NotFound() {
  return (
    <div className="bg-black h-screen grid place-items-center">
      <div>
        <h1 className="text-2xl font-bold text-center">
          Oops, page deleted <br />
          or doesn&apos;t exist
        </h1>
        <p className="mt-1.5 text-[#ddd] text-sm text-center font-medium">
          Go back to the main page
        </p>
        <Link
          className="bg-white/10 block mx-auto mt-7 py-3 px-5 rounded-full w-fit"
          href={"/"}
        >
          <RefreshCw size={18} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}
