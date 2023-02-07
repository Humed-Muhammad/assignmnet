import { createSelector } from '@reduxjs/toolkit';
import { Contract } from 'ethers';
import { RootState } from '../..';
import { MessageTypes } from '../../commonTypes';

import { DefaultSliceTypes } from './types';

const selectDefaultSlice = (state: RootState) => state.defaultReducer;

export const selectAllDefaultSlice: (state: RootState) => DefaultSliceTypes =
  createSelector([selectDefaultSlice], state => state);

export const selectContract: (
  state: RootState,
) => Omit<Contract, 'none'> | undefined = createSelector(
  [selectDefaultSlice],
  state => state.contract,
);

export const selectConnectedAccount: (state: RootState) => string | undefined =
  createSelector([selectDefaultSlice], state => state.connectedAccount);

export const selectIfWalletIsConnected: (state: RootState) => boolean =
  createSelector([selectDefaultSlice], state => state.isWalletConnected);

export const selectMessage: (state: RootState) => MessageTypes = createSelector(
  [selectDefaultSlice],
  state => state.message,
);

export const selectConnectingWallet: (state: RootState) => boolean =
  createSelector([selectDefaultSlice], state => state.connectingWallet);
