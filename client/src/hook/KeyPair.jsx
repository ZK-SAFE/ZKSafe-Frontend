import { useCallback } from 'react';
import {
  jwtToAddress,
  getZkLoginSignature,
  getExtendedEphemeralPublicKey,
  genAddressSeed,
  generateNonce,
  generateRandomness,
} from '@mysten/sui/zklogin';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { SuiClient } from '@mysten/sui/client';

const REDIRECT_URI = 'https://docs.sui.io';
const CLIENT_ID = '180266593987-uvm03t52n7uf9bd7tk0q5vb6su0o9bgb.apps.googleusercontent.com';
const FULLNODE_URL = 'https://fullnode.devnet.sui.io';

export const useZkLogin = () => {
  const suiClient = new SuiClient({ url: FULLNODE_URL });

  const initiateLogin = async () => {
    const ephemeralKeyPair = new Ed25519Keypair();

    const { epoch } = await suiClient.getLatestSuiSystemState();
    const maxEpoch = Number(epoch) + 2;

    const randomness = generateRandomness();
    const nonce = generateNonce(ephemeralKeyPair.getPublicKey(), maxEpoch, randomness);

    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: 'id_token',
      scope: 'openid',
      nonce: nonce,
    });

    const loginURL = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    window.location.href = loginURL;
  };

  const completeLogin = useCallback(async (jwt, userSalt, userSignature, partialZkLoginSignature, transactionBytes) => {
    const decodedJwt = JSON.parse(atob(jwt.split('.')[1]));
    const ephemeralKeyPair = new Ed25519Keypair();
    const { epoch } = await suiClient.getLatestSuiSystemState();
    const maxEpoch = Number(epoch) + 2;

    const extendedEphemeralPublicKey = getExtendedEphemeralPublicKey(ephemeralKeyPair.getPublicKey());

    const addressSeed = genAddressSeed(
      BigInt(userSalt),
      'sub',
      decodedJwt.sub,
      decodedJwt.aud
    ).toString();

    const zkLoginSignature = getZkLoginSignature({
      inputs: {
        ...partialZkLoginSignature,
        addressSeed,
      },
      maxEpoch,
      userSignature,
    });

    const zkLoginUserAddress = jwtToAddress(jwt, userSalt);

    const result = await suiClient.executeTransactionBlock({
      transactionBlock: transactionBytes,
      signature: zkLoginSignature,
    });

    return {
      result,
      address: zkLoginUserAddress,
    };
  }, []);

  return {
    initiateLogin,
    completeLogin,
  };
};
