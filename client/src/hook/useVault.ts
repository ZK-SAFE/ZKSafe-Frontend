import { useWallet } from '@suiet/wallet-kit';
import { TransactionBlock } from '@mysten/sui.js';
import { useCallback, useState } from 'react';

const VAULT_PACKAGE_ID = '0x...'; // Replace with your deployed package ID
const VAULT_MODULE = 'zk_safe::vault';

export const useVault = () => {
  const { signAndExecuteTransactionBlock } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createVault = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${VAULT_PACKAGE_ID}::${VAULT_MODULE}::create`,
      });

      const result = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });

      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create vault');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [signAndExecuteTransactionBlock]);

  const unlockVault = useCallback(async (vaultId: string, pubInput: number[]) => {
    try {
      setIsLoading(true);
      setError(null);

      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${VAULT_PACKAGE_ID}::${VAULT_MODULE}::unlock`,
        arguments: [
          tx.object(vaultId),
          tx.pure(pubInput),
        ],
      });

      const result = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });

      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unlock vault');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [signAndExecuteTransactionBlock]);

  const checkVaultStatus = useCallback(async (vaultId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${VAULT_PACKAGE_ID}::${VAULT_MODULE}::is_unlocked`,
        arguments: [tx.object(vaultId)],
      });

      const result = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });

      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check vault status');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [signAndExecuteTransactionBlock]);

  return {
    createVault,
    unlockVault,
    checkVaultStatus,
    isLoading,
    error,
  };
}; 