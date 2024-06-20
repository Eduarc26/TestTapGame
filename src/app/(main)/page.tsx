import Balance from "@/components/common/balance";
import BackgroundGradient from "@/components/common/bg-gradient";
import ClickProgress from "@/components/common/click-progress";
import { FarmButtonController } from "@/components/common/farm-button";

export default function Home() {
  return (
    <>
      <main className="px-6 text-white pt-[20%] h-screen">
        <Balance />
        <FarmButtonController />
      </main>
      <BackgroundGradient />
      <ClickProgress />
    </>
  );
}
