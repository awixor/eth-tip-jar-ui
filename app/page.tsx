import { TipJarCard } from "@/components/tip/tip-card";
import { ConnectWallet } from "@/components/wallet/connect-wallet";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-8 bg-zinc-50 px-4 py-16 dark:bg-zinc-950 sm:py-32">
      <div className="w-full flex flex-col items-center gap-4">
        <ConnectWallet />
        <TipJarCard />
      </div>
    </main>
  );
}
