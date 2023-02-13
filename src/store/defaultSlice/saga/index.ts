import { put, select, takeLatest } from 'redux-saga/effects';
import { actions } from '../slice';

import { ethereum, gasLimit } from '../../../utils/constant';
import { ContractTransaction, ethers, Signer } from 'ethers';
import { getSmartContractData } from '../../../utils/helpers';
import {
  selectAllDefaultSlice,
  selectConnectedAccount,
} from '../slice/selector';
import {
  DefaultSliceTypes,
  IAssignRoleTypes,
  IChangeRoleTypes,
  IGetContractDataTypes,
} from '../slice/types';
import { PayloadAction } from '@reduxjs/toolkit';

/* This function is responsible for checking if the user has connected their wallet. */
function* checkIfWalletIsConnectedSaga() {
  try {
    if (!ethereum) {
      yield put(
        actions.setMessages({
          content: 'Please install metamask!',
          type: 'warning',
        }),
      );
    }
    const accounts: string[] = yield ethereum.request({
      method: 'eth_accounts',
    });

    if (!accounts.length) {
      yield put(actions.setConnectedWallet(''));
      yield put(actions.setIsWalletIsConnected(false));
      yield put(
        actions.setMessages({
          content: 'Please connect your wallet to continue',
          type: 'info',
        }),
      );
    } else {
      yield put(actions.setConnectedWallet(accounts[0]));

      yield put(actions.setIsWalletIsConnected(true));
      yield put(
        actions.setMessages({
          content: '',
          type: null,
        }),
      );
    }
  } catch ({ message }) {
    yield put(
      actions.setMessages({
        content: message as string,
        type: null,
      }),
    );
    console.log(message);
  }
}

/* This function is responsible for requesting the user to connect their wallet. */
function* requestWalletConnectionsSaga() {
  try {
    if (!ethereum) {
      yield put(
        actions.setMessages({
          content: 'Please install metamask!',
          type: 'warning',
        }),
      );
    }
    yield ethereum.request({
      method: 'eth_requestAccounts',
    });
    yield put(actions.finishedWalletConnection());
  } catch ({ message }) {
    yield put(
      actions.setMessages({
        content: message as string,
        type: 'error',
      }),
    );
    yield put(actions.finishedWalletConnection());
  }
}

function* getContractData() {
  try {
    /* Creating a provider for the ethers.js library. */
    const provider: ethers.providers.Web3Provider =
      yield new ethers.providers.Web3Provider(ethereum);

    const connectedAccount: string = yield select(selectConnectedAccount);

    /* Getting the signer from the provider. */
    const signer: Signer = yield provider.getSigner();

    /***@Data From Contract */
    const data: IGetContractDataTypes = yield getSmartContractData({
      signer,
      connectedAccount,
    });

    if (data) {
      yield put(actions.finishRequestingContractData(data));
    }
  } catch (error: any) {
    if (error?.code === 'INSUFFICIENT_FUNDS') {
      yield put(
        actions.setMessages({
          content: 'Insufficient funds for intrinsic transaction cost',
          type: 'error',
        }),
      );
    } else if (error?.code === 'UNPREDICTABLE_GAS_LIMIT') {
      yield put(
        actions.setMessages({
          content: 'Can not estimate gas limit for transaction!',
          type: 'error',
        }),
      );
    } else {
      yield put(
        actions.setMessages({
          content:
            'Error occurred during transaction!, make sure you are the owner',
          type: 'error',
        }),
      );
    }
    console.log(error);
  }
}

function* createRoleSaga(action: PayloadAction<string>) {
  try {
    const stateData: DefaultSliceTypes = yield select(selectAllDefaultSlice);
    const tsxResponse: ContractTransaction =
      yield stateData?.contract?.addRoleType(action.payload, gasLimit);
    yield tsxResponse.wait();
    yield put(actions.finishedCreatingRole());
    yield put(
      actions.setMessages({
        content: 'Role created successfully!',
        type: 'success',
      }),
    );
  } catch (error) {
    yield put(
      actions.setMessages({
        content: 'Error occurred, please make sure you have a valid inputs',
        type: 'warning',
      }),
    );
    yield put(actions.finishedCreatingRole());
    console.log(error);
  }
}

function* assignRoleSaga(action: PayloadAction<IAssignRoleTypes>) {
  try {
    const stateData: DefaultSliceTypes = yield select(selectAllDefaultSlice);
    const tsxResponse: ContractTransaction = yield stateData?.contract?.addRole(
      action.payload.address,
      stateData.roles.indexOf(action.payload.roleName),
      gasLimit,
    );
    yield tsxResponse.wait();
    yield put(actions.finishedAssigningRole());
    yield put(
      actions.setMessages({
        content: 'Role assigned successfully!',
        type: 'success',
      }),
    );
  } catch (error) {
    yield put(actions.finishedAssigningRole());
    yield put(
      actions.setMessages({
        content: 'Error occurred, please make sure you have a valid inputs',
        type: 'warning',
      }),
    );
    console.log(error);
  }
}

function* changeMembersStatusSaga(action: PayloadAction<IChangeRoleTypes>) {
  try {
    const Status = {
      Activate: true,
      Deactivate: false,
    };
    const stateData: DefaultSliceTypes = yield select(selectAllDefaultSlice);

    const tsxResponse: ContractTransaction =
      yield stateData?.contract?.changeRoleStatus(
        action.payload.address,
        Status[action.payload.status],
        gasLimit,
      );
    yield tsxResponse.wait();

    yield put(actions.finishedChangingMembersStatus());
    yield put(
      actions.setMessages({
        content: 'Status changed successfully!',
        type: 'success',
      }),
    );
  } catch (error: any) {
    yield put(actions.finishedChangingMembersStatus());
    yield put(
      actions.setMessages({
        content: 'Error occurred during transaction!.',
        type: 'error',
      }),
    );
    console.log(error);
  }
}

export function* defaultLotterySaga() {
  yield takeLatest(
    actions.requestWalletConnection.type,
    requestWalletConnectionsSaga,
  );
  yield takeLatest(
    actions.checkIfWalletIsConnected.type,
    checkIfWalletIsConnectedSaga,
  );
  yield takeLatest(actions.requestContract.type, getContractData);
  yield takeLatest(actions.createRole.type, createRoleSaga);
  yield takeLatest(actions.assignRole.type, assignRoleSaga);
  yield takeLatest(actions.changeMembersStatus.type, changeMembersStatusSaga);
}
