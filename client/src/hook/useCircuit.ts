import { useState, useCallback } from 'react';
import { groth16 } from 'snarkjs';

export const useCircuit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateProof = useCallback(async (secret: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Convert secret to number array for circuit input
      const secretInput = Array.from(secret).map(char => char.charCodeAt(0));

      // Generate the proof
      const { proof, publicSignals } = await groth16.fullProve(
        { secret: secretInput },
        'circuit.wasm',
        'circuit_final.zkey'
      );

      return {
        proof,
        publicSignals,
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate proof');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyProof = useCallback(async (proof: any, publicSignals: any) => {
    try {
      setIsLoading(true);
      setError(null);

      const verificationKey = await fetch('verification_key.json').then(res => res.json());
      const isValid = await groth16.verify(verificationKey, publicSignals, proof);

      return isValid;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify proof');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    generateProof,
    verifyProof,
    isLoading,
    error,
  };
}; 