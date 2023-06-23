export default {
  error: {
    USER_NOT_FOUND: 'No user was found for the specified data.',
    NO_VALID_EMAIL: 'The entered E-Mail is invalid.',
    NO_VALID_PASSWORD_TOO_SHORT: 'The entered password is too short.',
    NO_VALID_PASSWORD_NO_UPPERCASE_LETTER:
      'The entered password does not contain an uppercase letter.',
    NO_VALID_PASSWORD_NO_DIGIT: 'The entered password does not contain a number.',
    NO_VALID_PASSWORD_NO_SPECIAL_CHARACTER:
      'The entered password does not contain a special character.',
    TOKEN_EXPIRED: 'The link expired. Please request a new one.',
    EMAIL_TAKEN: 'The entered E-Mail is already in use.',
    INVALID_CREDENTIALS: 'The combination of E-Mail and password is incorrect.',
    INVALID_TOKEN: 'The authorization is not valid anymore. Please log in again.',
    EMAIL_NOT_CONFIRMED: 'The E-Mail address was not confirmed yet.',
    VIDEO_ALREADY_ADDED_TO_PERSONAL_PLAYLIST: 'You already added this video!',
    VIDEO_NOT_EXISTS: 'The entered URL does not contain a video.',
  },
  httpError: 'The request could not be processed due to an HTTP-Error.',
  unexpectedError:
    'The request could not be processed due to an unexpected error. Please make sure that your device has an active internet connection.',
  users: {
    addVideo: {
      success: 'Successfully added the video to the queue.',
    },
  },
  auth: {
    register: {
      success:
        'Please verify your E-Mail address by clicking the link, which we sent to you via E-Mail.',
    },
    resendConfirmationLink: {
      success: 'The confirmation E-Mail was sent again. Please check your invoice.',
    },
    requestPasswordReset: {
      success: 'We sent an E-Mail containing a link for resetting your password.',
    },
    resetPassword: {
      success: 'You successfully resetted your password and can now log in using the new one.',
    },
  },
};
