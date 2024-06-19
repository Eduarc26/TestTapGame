import React from "react";
import { UsersIcon } from "lucide-react";
import { Referals } from "@/lib/types";
import { formattedBalance, getFriendWord } from "@/lib/utils";
const currency = process.env.NEXT_PUBLIC_CURRENCY;

interface FriendsListProps {
  refs: Referals[];
}

export default function FriendsList({ refs }: FriendsListProps) {
  const friendsAmount = refs.length;
  if (friendsAmount === 0) return;
  return (
    <div>
      <p className="font-medium pt-1.5">
        {friendsAmount} {getFriendWord(friendsAmount)}
      </p>
      <div className="">
        {refs.map((friend) => (
          <div key={friend.id} className="flex space-x-4 items-center">
            <div
              className="size-8 flex-shrink-0 rounded-full uppercase grid place-items-center text-sm font-medium"
              style={{
                background: friend.avatarColor,
              }}
            >
              {friend.name.slice(0, 1)}
            </div>
            <div className="flex-grow border-b border-[#282828] py-1.5 flex justify-between items-center pr-4">
              <div className="w-40 whitespace-nowrap overflow-ellipsis overflow-hidden">
                <span>{friend.name}</span>
                <span className="text-[#919191] text-xs flex items-center font-semibold">
                  <UsersIcon size={13} className="" />{" "}
                  <div className="flex ml-0.5 gap-0.5 mt-0.5 py-0.5">
                    <span>+</span> {friend.refs}
                  </div>
                </span>
              </div>
              <div className="font-medium">
                {formattedBalance(friend.balance)} {currency}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
