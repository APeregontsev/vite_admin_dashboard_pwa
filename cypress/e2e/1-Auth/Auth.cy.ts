describe("Auth", () => {
  it("1. Login form", () => {
    cy.visit("/");

    cy.get("input[name='email']").should("have.value", "");
    cy.get("input[name='password']").should("have.value", "");

    cy.get("button[type='submit']").should("have.text", "Log In");
  });

  it("2. Signup form", () => {
    cy.visit("/");

    cy.contains("Sign up").click();

    cy.get("input[name='email']").should("have.value", "");
    cy.get("input[name='firstName']").should("have.value", "");
    cy.get("input[name='lastName']").should("have.value", "");
    cy.get("input[name='password1']").should("have.value", "");
    cy.get("input[name='password2']").should("have.value", "");

    cy.get("button[type='submit']").should("have.text", "Register");
  });

  it("3. Wrong login or password - message displayed", () => {
    cy.visit("/");

    cy.get("input[name='email']").type("othersidesss@gmail.com2");
    cy.get("input[name='password']").type("qazwsx");

    cy.get("button[type='submit']").click();

    cy.get("div").contains(/Wrong login or password|Too many requests/g);
  });

  it("4. Forgot password form", () => {
    cy.visit("/");

    cy.get("input[name='email']").type("othersidesss@gmail.com");
    cy.get("input[name='password']").type("qazwsx");

    cy.get("button[type='submit']").click();

    cy.contains("Reset password").click();

    cy.get("h1").should("have.text", "Forgot password?");
    cy.get("input[name='email']").should("have.value", "");
    cy.get("button[type='submit']").should("have.text", "Send");
  });

  it("5. Reset password form", () => {
    cy.visit("/auth/resetpassword");

    cy.get("h1").should("have.text", "Reset Password");

    cy.get("input[name='password1']").should("have.value", "");
    cy.get("input[name='password2']").should("have.value", "");

    cy.get("button[type='submit']").should("have.text", "Send");
  });

  it("6. Login fields verification", () => {
    cy.visit("/");

    cy.get("input[name='email']").type("123");

    cy.get("button[type='submit']").click();

    cy.get("p").contains("Invalid email");
    cy.get("p").contains("Can't be empty");
  });

  it("7. Successful logIn and logOut", () => {
    /* cy.visit("/");

    cy.get("input[name='email']").type("othersidesss@gmail.com");
    cy.get("input[name='password']").type("qazwsxedc");

    cy.get("button[type='submit']").click();

    cy.location("href", { timeout: 2000 }).should("include", "/overview");
    cy.get("div", { timeout: 2000 }).contains(/You have successfully logged in/g); */

    // Lets login using email and password for further tests
    cy.logIn("othersidesss@gmail.com", "qazwsxedc");

    // Lets logout for further tests
    cy.logOut();
  });
});
