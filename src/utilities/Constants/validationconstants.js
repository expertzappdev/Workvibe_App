export const VALIDATE_EMAIL = 'validate_email';
export const VALIDATE_PASSWORD = 'validate_password';
export const VALIDATE_CONFIRMPASSWORD = 'validate_confirmpassword';
export const VALIDATE_NAME = 'validate_name';
export const VALIDATE_MOBILE = 'validate_mobile';
export const REQUIRED_EMAIL = 'required_email';
export const REQUIRED_PASSWORD = 'required_password';
export const REQUIRED_NAME = 'required_name';
export const REQUIRED_MOBILE = 'required_mobile';

export const ValidationLibrary = {
  validate_email: {
    regex: /\S+@\S+\.\S+/,
    message: 'Invalid E-mail ID',
  },
  validate_password: {
    message: 'Password strength is low',
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
    message: "Password should have 1 uppercase letter, 1 lowercase letter, 1 special character, 1 number,Min 8 characters"
  },
  validate_name: {
    regex: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{0,}$/,
    message: 'Name should contain Alphabets only',
  },
  validate_mobile: {
    regex: /^[0-9]{10}$/,
    message: 'Invalid mobile number',
  },
  validate_confirmpassword: {
    message: 'Password must be same',
  },
  required_email: {
    message: 'Email is required',
  },
  required_password: {
    message: 'Password is required',
  },
  required_name: {
    message: 'Name is required',
  },
  required_mobile: {
    message: 'Mobile is required',
  },
};
