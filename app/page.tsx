import { TipJarCard } from "@/components/tip/tip-card";
import { ConnectWallet } from "@/components/wallet/connect-wallet";
import { AdminPanel } from "@/components/admin/admin-panel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-8 bg-zinc-50 px-4 py-16 dark:bg-zinc-950 sm:py-32">
      <div className="w-full flex flex-col items-center gap-4 max-w-4xl">
        <ConnectWallet />
        <div className="flex gap-2 w-full sm:flex-row flex-col justify-center">
          <AdminPanel />
          <TipJarCard />
        </div>
      </div>
    </main>
  );
}
