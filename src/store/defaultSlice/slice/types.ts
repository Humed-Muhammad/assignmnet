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
  roles: string[];
  usersAddress: string[] | undefined;
  membersCount: number | undefined;
  roleTypesCount: number | undefined;
  creatingRole: boolean;
  assigningRole: boolean;
  changingMembersStatus: boolean;
}

export interface IGetContractDataTypes {
  roles: string[];
  usersAddress: string[];
  membersCount: number | undefined;
  roleTypesCount: number | undefined;
  contract: Omit<Contract, 'none'> | undefined;
}

export interface IAssignRoleTypes {
  roleName: string;
  address: string;
}

export interface IChangeRoleTypes {
  status: 'Activate' | 'Deactivate';
  address: string;
  isActive?: boolean | undefined;
}
