export const errorsMapping = {
  wrongPassword: { firebaseErr: "auth/wrong-password", text: "Wrong login or password" },
  wrongEmail: { firebaseErr: "auth/user-not-found", text: "Wrong login or password" },
  emailInUse: { firebaseErr: "auth/email-already-in-use", text: "Email already in use" },
  needLogin: { firebaseErr: "You need log-in first!", text: "You need log-in first!" },
  tooManyRequests: { firebaseErr: "auth/too-many-requests", text: "Too many requests, try again letter" },
};
