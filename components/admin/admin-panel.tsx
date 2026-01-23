"use client";

import { useEffect, useMemo, useState } from "react";
import {
  useBalance,
  useChainId,
  useConnection,
  useWaitForTransactionReceipt,
} from "wagmi";
import { formatEther } from "viem";
import {
  useReadTipJarOwner,
  useReadTipJarTotalTips,
  useWriteTipJarWithdraw,
  tipJarAddress,
} from "@/lib/generated";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircle, Lock, Unlock, CheckCircle2 } from "lucide-react";
import { cn, truncateHash } from "@/lib/utils";
import { StatBox } from "@/lib/ui/state-box";
import { STORAGE_KEYS } from "@/lib/constants";

export function AdminPanel() {
  const { address: connectedAddress } = useConnection();
  const chainId = useChainId();
  const [hash, setHash] = useState<`0x${string}`>();

  const { data: ownerAddress } = useReadTipJarOwner();
  const { data: totalTips } = useReadTipJarTotalTips();
  const { data: contractBalance, refetch: refetchBalance } = useBalance({
    address: tipJarAddress[chainId as keyof typeof tipJarAddress],
  });

  const {
    mutateAsync: withdraw,
    isPending: isWriting,
    error: writeError,
    reset,
  } = useWriteTipJarWithdraw();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const isOwner = useMemo(() => {
    if (!connectedAddress || !ownerAddress) return false;
    return connectedAddress.toLowerCase() === ownerAddress.toLowerCase();
  }, [connectedAddress, ownerAddress]);

  const handleWithdraw = async () => {
    try {
      reset();
      const txHash = await withdraw({});
      setHash(txHash);
    } catch (error) {
      console.error("Withdrawal failed:", error);
    }
  };

  useEffect(() => {
    const savedHash = localStorage.getItem(STORAGE_KEYS.PENDING_WITHDRAWAL_TX);

    if (savedHash && savedHash.startsWith("0x")) {
      const timeoutId = setTimeout(() => {
        setHash(savedHash as `0x${string}`);
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  useEffect(() => {
    if (receiptError) {
      localStorage.removeItem(STORAGE_KEYS.PENDING_WITHDRAWAL_TX);
    }
  }, [receiptError]);

  useEffect(() => {
    if (isConfirmed) {
      localStorage.removeItem(STORAGE_KEYS.PENDING_TX);
      refetchBalance();
    }
  }, [isConfirmed, refetchBalance]);

  if (!connectedAddress) return null;

  const isPending = isWriting || isConfirming;
  const hasFunds = contractBalance && contractBalance.value > 0;

  return (
    <Card
      className={cn("w-full max-w-xl overflow-hidden", {
        "justify-between": isOwner,
      })}
    >
      <CardHeader className="border-b bg-zinc-50/50 dark:bg-zinc-900/50">
        <div className="flex items-center gap-2">
          {isOwner ? (
            <Unlock className="h-5 w-5 text-green-600" />
          ) : (
            <Lock className="h-5 w-5 text-zinc-400" />
          )}
          <CardTitle>Admin Panel</CardTitle>
        </div>
        <CardDescription>
          {isOwner
            ? "Manage funds and contract settings."
            : "Authorized personnel only."}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-4 space-y-6">
        {!isOwner && (
          <div className="flex items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/50 dark:bg-yellow-950/30">
            <AlertCircle className="mt-0.5 h-5 w-5 text-yellow-600 shrink-0" />
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <p className="font-bold">Access Restricted</p>
              <p className="opacity-90">
                Your address ({truncateHash(connectedAddress)}) is not the
                owner.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <StatBox
            label="Total Tips"
            value={totalTips ? formatEther(totalTips) : "0"}
            symbol={contractBalance?.symbol}
          />
          <StatBox
            label="Available"
            value={contractBalance ? formatEther(contractBalance.value) : "0"}
            symbol={contractBalance?.symbol}
          />
        </div>

        {writeError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
            <p className="text-xs font-medium text-red-700 dark:text-red-400 wrap-break-word">
              {writeError?.message || "Transaction failed"}
            </p>
          </div>
        )}

        {isConfirmed && (
          <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-900/30 dark:text-green-200">
            <CheckCircle2 className="h-4 w-4" />
            <span>Withdrawal successful!</span>
            {hash && (
              <span className="ml-auto opacity-70">{truncateHash(hash)}</span>
            )}
          </div>
        )}
      </CardContent>

      {isOwner && (
        <CardFooter className="bg-zinc-50/50 dark:bg-zinc-900/50 pt-6">
          <Button
            onClick={handleWithdraw}
            disabled={isPending || !hasFunds}
            className="w-full transition-all self-end"
            size="lg"
          >
            {isPending ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                {isConfirming ? "Confirming..." : "Processing..."}
              </>
            ) : (
              `Withdraw ${contractBalance ? formatEther(contractBalance.value) : "0"} ${contractBalance?.symbol}`
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
