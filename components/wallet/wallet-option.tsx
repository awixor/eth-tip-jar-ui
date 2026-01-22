import { Connector } from "wagmi";
import ConnectorIcon from "./connector-icon";

type WalletOptionProps = {
  connector: Connector;
  onConnect: () => void;
  isConnecting?: boolean;
};

export function WalletOption({
  connector,
  onConnect,
  isConnecting,
}: WalletOptionProps) {
  return (
    <div>
      <button
        key={connector.uid}
        onClick={onConnect}
        disabled={isConnecting}
        className="flex items-center gap-2 rounded-lg cursor-pointer border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
      >
        <ConnectorIcon icon={connector.icon} name={connector.name} />
        <span>
          {isConnecting ? "Connecting..." : `Connect ${connector.name}`}
        </span>
      </button>
    </div>
  );
}
