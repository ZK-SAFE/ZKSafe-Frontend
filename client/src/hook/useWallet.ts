import { useCurrentAccount, useSignTransaction } from "@mysten/dapp-kit";

export const useWallet = () => {
  const account = useCurrentAccount();
  const signTransactionMutation = useSignTransaction();

  return {
    isConnected: !!account,
    address: account?.address,
    signTransaction: signTransactionMutation.mutate,
  };
}; 