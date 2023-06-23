export default {
  login: {
    title: 'Login',
    failedTitle: 'Failed to log in!',
    toRegistrationLabel: 'Sign up',
    forgotPasswordLabel: 'Forgot my password',
  },
  register: {
    title: 'Registration',
    failedTitle: 'Failed to Register!',
    succeededTitle: 'Registration successful!',
    succeededText:
      'Please verify your E-Mail address by clicking the link, which we sent to you via E-Mail.',
    toLoginLabel: 'Login',
  },
  confirmRegistration: {
    title: 'Confirm registration',
    succeededTitle: 'E-Mail confirmed!',
    succeededText:
      'You have successfully confirmed your E-Mail address and now can proceed logging in.',
    failedTitle: 'Confirmation failed!',
    failedText: 'The provided confirmation link is invalid or has expired.',
    toLoginLabel: 'Proceed logging in',
  },
  resendMail: {
    text: 'If you did not receive a confirmation E-Mail you can request it again by using the following form.',
    buttonLabel: 'Request again',
  },
  resetPassword: {
    title: 'Passwort Reset',
    text: 'Please enter a new password and confirm it.',
    succeededTitle: 'Passwort reset successful!',
    failedTitle: 'Password reset failed!',
    buttonLabel: 'Reset passwort',
    toLoginLabel: 'Proceed logging in',
  },
  form: {
    email: 'Email address',
    password: 'Password',
    validationPassword: 'Enter password again',
    loginLabel: 'Login',
    registerLabel: 'Sign up',
  },
  logOut: {
    confirmQuestion: 'Are you sure you want to sign out?',
    confirmButton: 'Yes, sign out',
  },
  error: {
    refreshTokenExpired: 'Your session has expired. Please log in again.',
    logout: 'Something went wrong during logging out. Please refresh the page.',
    title: 'Authentication error',
    toLoginLabel: 'Back to login',
  },
};
