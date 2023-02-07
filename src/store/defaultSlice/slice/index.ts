import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contract } from 'ethers';

import { MessageTypes } from '../../commonTypes';
import { DefaultSliceTypes } from './types';

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
    setContract: (state, action: PayloadAction<Contract>) => {
      state.contract = action.payload;
      state.gettingContract = false;
    },
    getDefaultData: state => {
      state.fetchingDatas = true;
    },

    setMessages: (state, action: PayloadAction<MessageTypes>) => {
      state.message = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const actions = defaultSlice.actions;

export const defaultReducer = defaultSlice.reducer;
