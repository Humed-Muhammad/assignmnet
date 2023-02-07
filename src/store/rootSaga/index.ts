import { fork } from 'redux-saga/effects';
import { defaultLotterySaga } from '../defaultSlice/saga';

export default function* rootSaga() {
  yield fork(defaultLotterySaga);
}
