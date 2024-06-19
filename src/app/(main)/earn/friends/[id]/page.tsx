import { getReferalsInfoById } from "@/actions/get-referals-info";
import BackButton from "@/components/common/back-button";
import TopNavigation from "@/components/common/earn/top-navigation";
import ErrorPage from "@/components/common/error-page";
import ClaimBonus from "@/components/common/friends/claim-bonus";
import FriendsList from "@/components/common/friends/friends-list";
import InviteFriendsButton from "@/components/common/invite-friends-button";
import Gem from "@/components/icons/gem";
import Image from "next/image";
import React from "react";

const appName = process.env.NEXT_PUBLIC_APP_NAME;

const FriendsListEmpy = () => {
  return (
    <div className="pt-3">
      <p className="mt-3 mb-6 font-medium text-lg">Как это работает</p>
      <ol className="items-center w-full space-y-5">
        <li className="flex-1">
          <span className="border-l-2 flex flex-col border-t-0 pl-4 pt-0 border-solid border-white font-medium">
            <span className="text-sm lg:text-base text-white">
              Делитесь своей реферальной ссылкой
            </span>
            <h4 className="text-sm text-neutral-500">
              Получайте
              <Gem size={12} className="inline-block mx-1 relative top-[1px]" />
              за каждого друга
            </h4>
          </span>
        </li>
        <li className="flex-1">
          <span className="border-l-2 flex flex-col border-t-0 pl-4 pt-0 border-solid border-white font-medium">
            <span className="text-sm lg:text-base text-white">
              Ваши друзья заходят в {appName}
            </span>
            <h4 className="text-sm text-neutral-500">
              И начинают зарабатывать вместе
            </h4>
          </span>
        </li>
        <li className="flex-1">
          <span className="border-l-2 flex flex-col border-t-0 pl-4 pt-0 border-solid border-white font-medium">
            <span className="text-sm lg:text-base text-white">
              Получайте гемы от друзей
            </span>
            <h4 className="text-sm text-neutral-500">
              Больше друзей, больше наград
            </h4>
          </span>
        </li>
      </ol>
    </div>
  );
};
export default async function EarnPage({ params }: { params: { id: string } }) {
  const { id } = params;
  if (isNaN(Number(id))) return <ErrorPage />;
  const refs = await getReferalsInfoById(Number(id));
  if (!refs) return <ErrorPage />;
  return (
    <main className="pl-4">
      <BackButton />
      <div className="pt-4 pr-4">
        <TopNavigation active="frends" />
      </div>
      <div className="mt-5 flex flex-col items-center pr-4">
        <Image
          src={"/icons/friends.webp"}
          width={40}
          height={40}
          alt="friends"
        />
        <h1 className="text-2xl font-semibold my-3">Приглашайте друзей</h1>
      </div>
      {refs.length > 0 ? (
        <div className="pr-4">
          <div className="h-32 border-4 rounded-lg border-primary grid place-items-center">
            <ClaimBonus />
          </div>
          <p className="text-center text-[13px] text-[#ebebf599] font-medium my-3">
            Получайте
            <Gem size={12} className="inline-block mx-1 relative top-[1px]" />
            за приглашение друзей! Чем больше друзей вы привели, тем больше ваши
            награды
          </p>
        </div>
      ) : (
        <FriendsListEmpy />
      )}

      <FriendsList refs={refs} />

      <InviteFriendsButton />
    </main>
  );
}
