"use client";

import { useState } from "react";
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
import { Coins } from "lucide-react";
import { Balence } from "../balence";
import { useGetCurrency } from "@/hooks/useGetCurrency";

const presets = ["0.001", "0.01", "0.05"];

export function TipJarCard() {
  const currency = useGetCurrency();
  const [amount, setAmount] = useState<string>("");

  return (
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
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">
              {currency}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          size="lg"
          disabled={!amount || parseFloat(amount) <= 0}
        >
          Send Tip
        </Button>
      </CardFooter>
    </Card>
  );
}
