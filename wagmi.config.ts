import { defineConfig, loadEnv } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { sepolia } from "wagmi/chains";

export default defineConfig(() => {
  const env = loadEnv({
    envDir: process.cwd(),
  });

  return {
    out: "lib/generated.ts",
    plugins: [
      etherscan({
        apiKey: env.ETHERSCAN_API_KEY!,
        chainId: sepolia.id,
        contracts: [
          {
            name: "TipJar",
            address: "0x0e54a8B9ce9644AE19cc69A2372305Fa9C3b3821",
          },
        ],
      }),
      react(),
    ],
  };
});
