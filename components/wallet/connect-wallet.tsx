"use client";

import { useConnect, useConnection, useConnectors, useDisconnect } from "wagmi";
import { WalletOption } from "./wallet-option";
import { NoWalletDetected } from "./no-wallet-detected";
import { WalletConnected } from "./wallet-connected";
import { useEffect, useState } from "react";
import ConnectWalletSkeleton from "../skeletons/connect-wallet-skeleton";

export const ConnectWallet = () => {
  const [shouldShowNoWallet, setShouldShowNoWallet] = useState(false);
  const { mutate: connect, isPending: isConnectingWallet } = useConnect();
  const { mutate: disconnect } = useDisconnect();
  const { address, connector, isConnected, isConnecting, isReconnecting } =
    useConnection();
  const connectors = useConnectors();

  useEffect(() => {
    if (connectors.length > 0) return;

    const timer = setTimeout(() => {
      setShouldShowNoWallet(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [connectors.length]);

  if (isConnected && address)
    return (
      <WalletConnected
        address={address}
        connectorIcon={connector?.icon}
        connectorName={connector?.name}
        onDisconnect={() => disconnect()}
      />
    );

  if (isConnecting || isReconnecting) return <ConnectWalletSkeleton />;

  if (connectors.length > 0) {
    return (
      <div className="flex gap-3">
        {connectors.map((connector) => (
          <WalletOption
            key={connector.id}
            connector={connector}
            onConnect={() => connect({ connector })}
            isConnecting={isConnectingWallet}
          />
        ))}
      </div>
    );
  }

  if (shouldShowNoWallet) return <NoWalletDetected />;

  return <ConnectWalletSkeleton />;
};
