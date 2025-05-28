/* eslint-disable prettier/prettier */
export const constants = {
  apiEndPoints: {
    login: 'auth/login',
    logOut: 'auth/logout',
    clockin: 'attendance/clock-in',
    clockout: 'attendance/clock-out',
    userAttendance: 'attendance/today',
  },
  apiMethod: {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
  apiSuccessMessage: {
    LOGIN_MESSAGE: 'Logged in successfully',
    LOGOUT_MESSAGE: 'Token invalidated successfully',
    CLOCK_IN: 'Clocked in successfully',
    CLOCK_OUT: 'Clocked out successfully',
    USER_ATTENDANCE: 'User attendance for today retrieved successfully',
  },
};
