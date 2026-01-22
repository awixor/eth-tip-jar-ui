import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TipJar
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0e54a8B9ce9644AE19cc69A2372305Fa9C3b3821)
 */
export const tipJarAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'message',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'NewTip',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_message', internalType: 'string', type: 'string' }],
    name: 'tip',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalTips',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0e54a8B9ce9644AE19cc69A2372305Fa9C3b3821)
 */
export const tipJarAddress = {
  11155111: '0x0e54a8B9ce9644AE19cc69A2372305Fa9C3b3821',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0e54a8B9ce9644AE19cc69A2372305Fa9C3b3821)
 */
export const tipJarConfig = { address: tipJarAddress, abi: tipJarAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tipJarAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0e54a8B9ce9644AE19cc69A2372305Fa9C3b3821)
 */
export const useReadTipJar = /*#__PURE__*/ createUseReadContract({
  abi: tipJarAbi,
  address: tipJarAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tipJarAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0e54a8B9ce9644AE19cc69A2372305Fa9C3b3821)
 */
export const useReadTipJarOwner = /*#__PURE__*/ createUseReadContract({
  abi: tipJarAbi,
  address: tipJarAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tipJarAbi}__ and `functionName` set to `"totalTips"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0e54a8B9ce9644AE19cc69A2372305Fa9C3b3821)
 */
export const useReadTipJarTotalTips = /*#__PURE__*/ createUseReadContract({
  abi: tipJarAbi,
  address: tipJarAddress,
  functionName: 'totalTips',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tipJarAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0e54a8B9ce9644AE19cc69A2372305Fa9C3b3821)
 */
export const useWriteTipJar = /*#__PURE__*/ createUseWriteContract({
  abi: tipJarAbi,
  address: tipJarAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tipJarAbi}__ and `functionName` set to `"tip"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0e54a8B9ce9644AE19cc69A2372305Fa9C3b3821)
 */
export const useWriteTipJarTip = /*#__PURE__*/ createUseWriteContract({
  abi: tipJarAbi,
  address: tipJarAddress,
  functionName: 'tip',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tipJarAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0e54a8B9ce9644AE19cc69A2372305Fa9C3b3821)
 */
export const useWriteTipJarWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: tipJarAbi,
  address: tipJarAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tipJarAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0e54a8B9ce9644AE19cc69A2372305Fa9C3b3821)
 */
export const useSimulateTipJar = /*#__PURE__*/ createUseSimulateContract({
  abi: tipJarAbi,
  address: tipJarAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tipJarAbi}__ and `functionName` set to `"tip"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0e54a8B9ce9644AE19cc69A2372305Fa9C3b3821)
 */
export const useSimulateTipJarTip = /*#__PURE__*/ createUseSimulateContract({
  abi: tipJarAbi,
  address: tipJarAddress,
  functionName: 'tip',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tipJarAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0e54a8B9ce9644AE19cc69A2372305Fa9C3b3821)
 */
export const useSimulateTipJarWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tipJarAbi,
    address: tipJarAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tipJarAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0e54a8B9ce9644AE19cc69A2372305Fa9C3b3821)
 */
export const useWatchTipJarEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: tipJarAbi,
  address: tipJarAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tipJarAbi}__ and `eventName` set to `"NewTip"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0e54a8B9ce9644AE19cc69A2372305Fa9C3b3821)
 */
export const useWatchTipJarNewTipEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tipJarAbi,
    address: tipJarAddress,
    eventName: 'NewTip',
  })
