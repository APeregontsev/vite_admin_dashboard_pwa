declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      logIn(email: string, pass: string): Chainable<void>;
      logOut(): Chainable<void>;
    }
  }
}
