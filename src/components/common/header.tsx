"use client";
import { capitalizeFirstLetter } from "@/lib/utils";
import useUserStore from "@/storage/user-store";
import React from "react";

export default function Header() {
  const { user } = useUserStore();

  return (
    <header className="text-white p-2 flex items-center">
      {/* <div
        className="size-24 rounded-full grid place-items-center font-bold text-2xl mx-auto mt-6"
        style={{
          background: user?.avatarColor,
        }}
      >
        {capitalizeFirstLetter(user?.name.charAt(0) || "")}
      </div>
      <span className="mt-3 text-2xl font-bold text-center mx-auto block">
        {user?.name || ""}
      </span> */}
      <div
        className="size-9 rounded-full grid place-items-center font-bold text-2xl"
        style={{
          background: user?.avatarColor,
        }}
      >
        {capitalizeFirstLetter(user?.name.charAt(0) || "")}
      </div>
      <span className="text-lg font-bold ml-2">{user?.name || ""}</span>
    </header>
  );
}
