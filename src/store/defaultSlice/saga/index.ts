import { put, select, takeLatest } from 'redux-saga/effects';
import { actions } from '../slice';

import { ethereum } from '../../../utils/constant';
import { ethers, Signer } from 'ethers';
import { getLotteryData } from '../../../utils/helpers';
import { selectConnectedAccount } from '../slice/selector';
import { IGetContractDataTypes } from '../slice/types';

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
    const provider: { getSigner: () => object } =
      yield new ethers.providers.Web3Provider(ethereum);

    const connectedAccount: string = yield select(selectConnectedAccount);

    /* Getting the signer from the provider. */
    const signer: Signer = yield provider.getSigner();

    /***@Data From Contract */
    const data: IGetContractDataTypes = yield getLotteryData({
      signer,
      connectedAccount,
    });

    if (data) {
      yield put(actions.finishRequestingContractData(data));
    }
    // console.log(data);
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
          content: 'Error occurred during transaction!',
          type: 'error',
        }),
      );
    }
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
}
