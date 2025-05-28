/* eslint-disable prettier/prettier */
import {all} from 'redux-saga/effects';
import {authSagas} from './authSagas'; // Import your individual sagas
import {clockSaga} from './clockSaga';

export function* rootSaga() {
  yield all([authSagas(), clockSaga()]);
}
