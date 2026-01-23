import { Wallet } from "lucide-react";
import { formatEther } from "viem";
import { useBalance, useChainId } from "wagmi";
import { useGetCurrency } from "@/hooks/useGetCurrency";
import { tipJarAddress } from "@/lib/generated";
import { Spinner } from "@/components/ui/spinner";

export function Balence() {
  const currency = useGetCurrency();
  const chainId = useChainId();

  const { data, isLoading, isError } = useBalance({
    address: tipJarAddress[chainId as keyof typeof tipJarAddress],
  });

  const renderBalence = () => {
    const balanceString = data ? formatEther(data.value) : "0";

    if (isLoading) return <Spinner />;

    if (isError)
      return <span className="text-red-400">Failed to get balance</span>;

    return `${balanceString} ${currency}`;
  };

  return (
    <div className="flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-800">
      <Wallet className="h-3.5 w-3.5 text-zinc-500" />
      <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">
        {renderBalence()}
      </span>
    </div>
  );
}
