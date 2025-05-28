export const validationConstants = { 
    VALIDATE_EMAIL : "validate_email",
    VALIDATE_PASSWORD : "validate_password",
    VALIDATE_CONFIRMPASSWORD : "validate_confirmpassword",
    VALIDATE_NAME : "validate_name",
    VALIDATE_MOBILE : "validate_mobile",
    REQUIRED_EMAIL : "required_email",
    REQUIRED_PASSWORD : "required_password",
    REQUIRED_NAME : "required_name",
    REQUIRED_MOBILE : "required_mobile",
}

export const ValidationLibrary = {
  validate_email: {
    regex: /\S+@\S+\.\S+/,
    message: "Invalid E-mail ID",
  },
  validate_password: {
    message: "Password strength is low",
    regex:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
    message:
      "Password should have 1 uppercase letter, 1 lowercase letter, 1 special character, 1 number,Min 8 characters",
  },
  validate_name: {
    regex: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{0,}$/,
    message: "Name should contain Alphabets only",
  },
  validate_mobile: {
    regex: /^[0-9]{10}$/,
    message: "Invalid mobile number",
  },
  validate_confirmpassword: {
    message: "Password must be same",
  },
  required_email: {
    message: "Email is required",
  },
  required_password: {
    message: "Password is required",
  },
  required_name: {
    message: "Name is required",
  },
  required_mobile: {
    message: "Mobile is required",
  },
};
