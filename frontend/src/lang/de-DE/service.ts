export default {
  error: {
    USER_NOT_FOUND: 'Für die angegebenen Daten konnte kein Benutzer gefunden werden.',
    NO_VALID_EMAIL: 'Die angegebene E-Mail ist nicht korrekt.',
    NO_VALID_PASSWORD_TOO_SHORT: 'Das angegebene Passwort ist zu kurz.',
    NO_VALID_PASSWORD_NO_UPPERCASE_LETTER:
      'Das angegebene Passwort beinhaltet keinen Großbuchstaben.',
    NO_VALID_PASSWORD_NO_DIGIT: 'Das angegebene Passwort beinhaltet keine Ziffer.',
    NO_VALID_PASSWORD_NO_SPECIAL_CHARACTER:
      'Das angegebene Passwort beinhaltet kein Sonderzeichen.',
    TOKEN_EXPIRED: 'Der Link ist abgelaufen. Bitte fordern Sie einen neuen an.',
    EMAIL_TAKEN: 'Die angegebene E-Mail wird bereits von einem Konto verwendet.',
    INVALID_CREDENTIALS: 'Die Kombination aus E-Mail und Passwort ist nicht korrekt.',
    INVALID_TOKEN: 'Die Autorisierung ist nicht mehr gültig. Bitte loggen Sie sich erneut ein.',
    EMAIL_NOT_CONFIRMED: 'Die E-Mail-Adresse des Kontos wurde noch nicht bestätigt.',
    VIDEO_ALREADY_ADDED_TO_PERSONAL_PLAYLIST: 'Du hast dieses Video bereits hinzugefügt!',
    VIDEO_NOT_EXISTS: 'Die eingegebene URL enthält kein Video.',
  },
  httpError: 'Die Anfrage konnte aufgrund eines HTTP-Errors nicht bearbeitet werden.',
  unexpectedError:
    'Die Anfrage konnte aufgrund eines unerwarteten Fehlers nicht bearbeitet werden. Bitte stellen Sie sicher, dass Ihr Gerät eine aktive Internetverbindung hat.',
  users: {
    addVideo: {
      success: 'Video wurde erfolgreich zur Warteschlange hinzugefügt.',
    },
  },
  auth: {
    register: {
      success:
        'Bitte bestätigen Sie Ihre E-Mail-Adresse über den Link, den wir Ihnen per E-Mail zugeschickt haben.',
    },
    resendConfirmationLink: {
      success: 'Die Bestätigungsmail wurde erneut versandt. Bitte überprüfen Sie Ihr Postfach.',
    },
    requestPasswordReset: {
      success:
        'Wir haben Ihnen eine E-Mail mit einem Link zum Zurücksetzen Ihres Passwortes geschickt.',
    },
    resetPassword: {
      success:
        'Sie haben Ihr Passwort erfolgreich zurückgesetzt und können sich nun mit dem neuen Passwort einloggen.',
    },
  },
};
