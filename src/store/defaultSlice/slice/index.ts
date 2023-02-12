import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contract } from 'ethers';

import { MessageTypes } from '../../commonTypes';
import {
  DefaultSliceTypes,
  IAssignRoleTypes,
  IGetContractDataTypes,
} from './types';

const initialState: DefaultSliceTypes = {
  contract: undefined,
  fetchingDatas: false,
  gettingContract: false,
  connectedAccount: undefined,
  isWalletConnected: false,
  connectingWallet: false,
  checkingIfWalletIsConnected: false,
  message: {
    type: 'success',
    content: '',
  },
  roles: [],
  usersAddress: [],
  membersCount: undefined,
  roleTypesCount: undefined,
  creatingRole: false,
  assigningRole: false,
};

export const defaultSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    requestWalletConnection: state => {
      state.connectingWallet = true;
    },
    finishedWalletConnection: state => {
      state.connectingWallet = false;
      state.isWalletConnected = true;
    },
    checkIfWalletIsConnected: state => {
      state.checkingIfWalletIsConnected = true;
    },
    setConnectedWallet: (state, action: PayloadAction<string>) => {
      state.connectedAccount = action.payload;
      state.checkingIfWalletIsConnected = false;
    },
    setIsWalletIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isWalletConnected = action.payload;
    },
    requestContract: state => {
      state.gettingContract = true;
    },
    finishRequestingContractData: (
      state,
      action: PayloadAction<IGetContractDataTypes>,
    ) => {
      state.contract = action.payload.contract;
      state.roles = action.payload.roles;
      state.usersAddress = action.payload.usersAddress;
      state.membersCount = action.payload.membersCount;
      state.roleTypesCount = action.payload.roleTypesCount;
    },
    setContract: (state, action: PayloadAction<Contract>) => {
      state.contract = action.payload;
      state.gettingContract = false;
    },

    setMessages: (state, action: PayloadAction<MessageTypes>) => {
      state.message = action.payload;
    },
    createRole: (state, action: PayloadAction<string>) => {
      state.creatingRole = true;
    },
    finishedCreatingRole: state => {
      state.creatingRole = false;
    },
    assignRole: (state, action: PayloadAction<IAssignRoleTypes>) => {
      state.assigningRole = true;
    },
    finishedAssigningRole: state => {
      state.assigningRole = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const actions = defaultSlice.actions;

export const defaultReducer = defaultSlice.reducer;
