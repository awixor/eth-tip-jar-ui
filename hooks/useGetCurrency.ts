import { useChainId } from "wagmi";
import { sepolia } from "wagmi/chains";

export function useGetCurrency() {
  const chainid = useChainId();
  const currency = chainid === sepolia.id ? "sepETH" : "ETH";

  return currency;
}
