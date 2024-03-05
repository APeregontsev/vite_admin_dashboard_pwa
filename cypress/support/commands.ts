/// <reference types="cypress" />

Cypress.Commands.add("logOut", () => {
  cy.get("div[title='Logout']").click();
  cy.get("h1").contains("Log In to Dashboard Kit");
});

Cypress.Commands.add("logIn", (email: string, pass: string) => {
  cy.visit("/");

  cy.get("input[name='email']").type(email);
  cy.get("input[name='password']").type(pass);

  cy.wait(1000);

  cy.get("button[type='submit']").click();

  cy.location("href", { timeout: 2000 }).should("include", "/overview");
  cy.get("div", { timeout: 2000 }).contains(/You have successfully logged in/g);
});

declare namespace Cypress {
  interface Chainable<Subject = any> {
    logOut(): Chainable<null>;
    logIn(email: string, pass: string): Chainable<null>;
  }
}
