/* eslint-disable no-alert */
import {put, takeEvery, select, takeLatest} from 'redux-saga/effects';
import apiConnector from '../Services/Api/apiConnector';
import {constants} from '../Constants/apiConstants';
import {ClockAction} from '../Redux/ClockRedux/Actions';
import {ClockTypes} from '../Redux/ClockRedux/Types';
import {UserSelectors} from '../Redux/UserRedux';
import {clockSelectors} from '../Redux/ClockRedux/Selectors';

export function* clockIn(action) {
  try {
    const payload = action.payload.clockInRequest;
    // alert(JSON.stringify(payload));
    const isClockIn = yield select(clockSelectors.selectIsUserClockIn);
    if (!isClockIn) {
      const res = yield apiConnector(
        constants.apiMethod.POST,
        constants.apiEndPoints.clockin,
        payload,
      );

      if (res.message === constants.apiSuccessMessage.CLOCK_IN) {
        yield put(ClockAction.clockInSuccess());
        yield put(ClockAction.seveAttendanceId(res.data.attendanceId));
        const employeeId = yield select(UserSelectors.selectEmployeeId);
        yield put(ClockAction.getUserAttendance(employeeId));
      } else if (res.status) {
        alert(res.message);
      } else {
        yield put(ClockAction.clockInFailed(res));
      }
    }
  } catch (error) {
    yield put(ClockAction.clockInFailed({error: error.message}));
  }
}

export function* clockOut(action) {
  try {
    const payload = action.payload.clockOutRequest;
    const attendanceId = yield select(clockSelectors.selectAttendaceId);
    // alert(JSON.stringify(payload));
    const res = yield apiConnector(
      constants.apiMethod.POST,
      // constants.apiEndPoints.clockout,
      `${constants.apiEndPoints.clockout}/${attendanceId}`,
      payload,
    );
    if (res.message === constants.apiSuccessMessage.CLOCK_OUT) {
      yield put(ClockAction.clockOutSuccess());
      const employeeId = yield select(UserSelectors.selectEmployeeId);
      yield put(ClockAction.getUserAttendance(employeeId));
    } else if (res.status) {
      alert(res.message);
    } else {
      yield put(ClockAction.clockOutFailed(res));
    }
  } catch (error) {
    yield put(ClockAction.clockOutFailed({error: error.message}));
  }
}
export function* getUserAttendance(action) {
  // const employeeId = action.payload.employeeId;
  // const userAttendanceEndPoint = constants.apiEndPoints.userAttendance;
  try {
    const res = yield apiConnector(
      constants.apiMethod.GET,
      constants.apiEndPoints.userAttendance,
      // `${userAttendanceEndPoint}?user_id=${employeeId}`,
    );
    // if (res.message === constants.apiSuccessMessage.USER_ATTENDANCE) {
    //   yield put(ClockAction.saveUserAttendance(res.data?.attendance));
    if (res.data?.attendance) {
      yield put(ClockAction.seveAttendanceId(res.data?.attendance.id));
    }
    // }
  } catch (error) {
    yield put(ClockAction.clockOutFailed({error: error.message}));
  }
}

export function* clockSaga() {
  yield takeLatest(ClockTypes.CLOCKIN_REQUEST, clockIn);
  yield takeEvery(ClockTypes.CLOCKOUT_REQUEST, clockOut);
  yield takeEvery(ClockTypes.GET_USER_ATTENDANCE, getUserAttendance);
}
