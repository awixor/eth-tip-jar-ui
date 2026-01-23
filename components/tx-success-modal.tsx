"use client";

import { useEffect } from "react";
import { CheckCircle2, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TransactionReceipt } from "viem";
import { useConnection } from "wagmi";
import { truncateHash } from "@/lib/utils";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  receipt?: TransactionReceipt;
}

export function TransactionSuccessModal({
  isOpen,
  onClose,
  receipt,
}: SuccessModalProps) {
  const { chain } = useConnection();

  useEffect(() => {
    if (isOpen) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 9999,
      };

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
        });
      }, 250);
    }
  }, [isOpen]);

  const explorerUrl = chain?.blockExplorers?.default.url;

  const details = [
    { label: "Block Number", value: `#${receipt?.blockNumber.toString()}` },
    {
      label: "Transaction hash",
      value: truncateHash(receipt?.transactionHash || "", 20, 10),
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg border-none bg-linear-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900 shadow-2xl">
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30"
          >
            <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
          </motion.div>

          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Transaction Confirmed!
            </DialogTitle>
            <DialogDescription className="text-base">
              Your tip has been permanently recorded on the blockchain.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 w-full space-y-2">
            {details.map((item) => (
              <div
                key={item.label}
                className="flex justify-between rounded-lg bg-zinc-100 p-3 text-xs font-mono dark:bg-zinc-800/50"
              >
                <span className="text-zinc-500">{item.label}</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-200">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex w-full flex-col gap-3">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() =>
                window.open(
                  `${explorerUrl}/tx/${receipt?.transactionHash}`,
                  "_blank",
                )
              }
            >
              View on Explorer
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button className="w-full" onClick={onClose}>
              Awesome
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
