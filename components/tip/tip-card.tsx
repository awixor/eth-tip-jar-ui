"use client";

import { useEffect, useState } from "react";
import { Coins } from "lucide-react";
import { parseEther } from "viem/utils";
import { useConnection, useWaitForTransactionReceipt } from "wagmi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetCurrency } from "@/hooks/useGetCurrency";
import { useWriteTipJarTip } from "@/lib/generated";
import { Spinner } from "@/components/ui/spinner";
import { Balence } from "../balence";
import { TransactionSuccessModal } from "../tx-success-modal";

const presets = ["0.001", "0.01", "0.05"];

export function TipJarCard() {
  const { isConnected } = useConnection();
  const currency = useGetCurrency();
  const [amount, setAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);
  const [showSuccess, setShowSuccess] = useState(false);
  const [tippedAmount, setTippedAmount] = useState("");
  const {
    mutateAsync,
    isPending: isWriting,
    error: writeError,
    reset: resetWrite,
  } = useWriteTipJarTip();

  const {
    data: receipt,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed && receipt) {
      const timer = setTimeout(() => {
        setShowSuccess(true);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [isConfirmed, receipt]);

  const handleSendTip = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setTippedAmount(amount);

    try {
      const txHash = await mutateAsync({
        value: parseEther(amount),
        args: [message],
      });
      setHash(txHash);
      setAmount("");
      setMessage("");
      resetWrite();
    } catch (error) {
      console.error("Error sending tip:", error);
    }
  };

  const isPending = isWriting || isConfirming;
  const error = writeError || receiptError;
  const sendButtonDisabled =
    !isConnected || !amount || parseFloat(amount) <= 0 || isPending;

  const getButtonText = () => {
    if (isWriting) return "Waiting for wallet...";
    if (isConfirming) return "Confirming transaction...";
    if (isConfirmed) return "Send another tip";
    if (isPending) return "Posting...";

    return "Send Tip";
  };

  return (
    <>
      <Card className="w-full max-w-md border-zinc-200 shadow-xl dark:border-zinc-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <Coins className="h-5 w-5 text-amber-500" />
              Tip Jar
            </CardTitle>
            <Balence />
          </div>
          <CardDescription>
            Support this project by sending a small tip to the jar.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-2">
            {presets.map((preset) => (
              <Button
                key={preset}
                variant={amount === preset ? "default" : "outline"}
                size="sm"
                onClick={() => setAmount(preset)}
                className="font-mono cursor-pointer"
                disabled={isWriting || !isConnected}
              >
                {preset}
              </Button>
            ))}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="amount" className="text-zinc-500">
              Custom Amount (ETH)
            </Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                step="0.0001"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pr-12 font-mono"
                disabled={isWriting || !isConnected}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">
                {currency}
              </span>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="message" className="text-zinc-500">
              Message (Optional)
            </Label>
            <Input
              id="message"
              type="text"
              placeholder="Leave a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={100}
              disabled={isWriting || !isConnected}
            />
            <p className="text-xs text-zinc-400">{message.length}/100</p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
              <p className="text-xs font-medium text-red-700 dark:text-red-400 wrap-break-word">
                {error ? error.message : "Transaction failed"}
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Button
            className="w-full bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            size="lg"
            disabled={sendButtonDisabled}
            onClick={handleSendTip}
          >
            {isPending && <Spinner />}
            {getButtonText()}
          </Button>
        </CardFooter>
      </Card>
      <TransactionSuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        tippedAmount={tippedAmount}
        receipt={receipt}
      />
    </>
  );
}
