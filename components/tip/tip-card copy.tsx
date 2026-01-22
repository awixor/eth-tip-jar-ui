"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type TipCardProps = {
  balance?: string;
  onTip: (amount: string) => void;
  isLoading?: boolean;
};

const PRESET_AMOUNTS = ["0.001", "0.01", "0.05"];

export function TipCard({
  balance = "0",
  onTip,
  isLoading = false,
}: TipCardProps) {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const handlePresetClick = (amount: string) => {
    setSelectedPreset(amount);
    setCustomAmount("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedPreset(null);
  };

  const getTipAmount = () => {
    return customAmount || selectedPreset || "0";
  };

  const handleTip = () => {
    const amount = getTipAmount();
    if (amount && amount !== "0") {
      onTip(amount);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tip the Jar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Balance Display */}
        <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Current Balance
          </p>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {balance} ETH
          </p>
        </div>

        {/* Preset Buttons */}
        <div>
          <Label className="mb-3 block">Quick Tip</Label>
          <div className="flex gap-2">
            {PRESET_AMOUNTS.map((amount) => (
              <Button
                key={amount}
                onClick={() => handlePresetClick(amount)}
                disabled={isLoading}
                variant={selectedPreset === amount ? "default" : "outline"}
                className="flex-1"
              >
                {amount} ETH
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Input */}
        <div className="space-y-2">
          <Label htmlFor="custom-amount">Custom Amount (ETH)</Label>
          <Input
            id="custom-amount"
            type="number"
            step="0.001"
            min="0"
            placeholder="Enter custom amount"
            value={customAmount}
            onChange={handleCustomChange}
            disabled={isLoading}
          />
        </div>

        {/* Tip Button */}
        <Button
          onClick={handleTip}
          disabled={isLoading || (!selectedPreset && !customAmount)}
          className="w-full"
        >
          {isLoading ? "Processing..." : "Tip"}
        </Button>
      </CardContent>
    </Card>
  );
}
