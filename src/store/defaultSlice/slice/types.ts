import { Contract } from 'ethers';
import { MessageTypes } from '../../commonTypes';

export interface DefaultSliceTypes {
  contract: Omit<Contract, 'none'> | undefined;
  connectedAccount: string | undefined;
  isWalletConnected: boolean;
  fetchingDatas: boolean;
  gettingContract: boolean;
  connectingWallet: boolean;
  checkingIfWalletIsConnected: boolean;
  message: MessageTypes;
}
