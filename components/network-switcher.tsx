"use client";

import { useChains, useConnection, useSwitchChain } from "wagmi";
import { ChevronDown, Network } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function NetworkSwitcher() {
  const { chain } = useConnection();
  const chains = useChains();
  const { mutate: switchChain, isPending } = useSwitchChain();

  const handleSwitch = (targetChainId: number) => {
    switchChain({ chainId: targetChainId });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-1">
          <Network className="h-4 w-4" />
          {chain?.name ?? "Select Network"}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Switch Network</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {chains.map((ch) => (
            <DropdownMenuItem
              key={ch.id}
              onClick={() => handleSwitch(ch.id)}
              disabled={isPending || ch.id === chain?.id}
            >
              <div className="flex items-center gap-2 flex-1">
                <div
                  className={`h-3 w-3 rounded-full ${
                    ch.testnet
                      ? "bg-blue-500"
                      : ch.id === 1
                        ? "bg-black"
                        : "bg-purple-600"
                  }`}
                />
                <span>{ch.name}</span>
              </div>
              {ch.id === chain?.id && (
                <DropdownMenuShortcut>Current</DropdownMenuShortcut>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
