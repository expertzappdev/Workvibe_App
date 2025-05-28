/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
import {put, takeEvery, takeLatest, select} from 'redux-saga/effects';
import {AuthTypes} from '../Redux/AuthRedux';
import apiConnector from '../Services/Api/apiConnector';
import {constants} from '../Constants/apiConstants';
import {AuthAction} from '../Redux/AuthRedux';
import {userActions} from '../Redux/UserRedux';
import {ClockAction} from '../Redux/ClockRedux/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function* login(action) {
  try {
    const payload = action.payload;
    const res = yield apiConnector(
      constants.apiMethod.POST,
      constants.apiEndPoints.login,
      payload,
    );
    if (res?.message === constants.apiSuccessMessage.LOGIN_MESSAGE) {
      yield put(AuthAction.loginSuccess(res?.data.token));
      yield put(userActions.setUserData(res?.data?.user));
      yield AsyncStorage.setItem('token', res?.data.token);
    } else {
      yield put(AuthAction.loginFailed(res));
    }
  } catch (error) {
    yield put(AuthAction.loginFailed({error: error.message}));
    alert(error?.message);
  }
}

export function* logOut(action) {
  try {
    const payload = action.payload;
    const res = yield apiConnector(
      constants.apiMethod.POST,
      constants.apiEndPoints.logOut,
      payload,
    );
    if (res?.message === constants.apiSuccessMessage.LOGOUT_MESSAGE) {
      yield put(userActions.resetUserRedux());
      yield put(ClockAction.resetClockRedux());
      yield put(AuthAction.resetAuthRedux());
    }
  } catch (error) {
    yield put(AuthAction.loginFailed({error: error.message}));
    alert(error?.message);
  }
}

export function* authSagas() {
  yield takeEvery(AuthTypes.LOGIN_REQUEST, login);
  yield takeEvery(AuthTypes.LOGIN_OUT, logOut);
}
