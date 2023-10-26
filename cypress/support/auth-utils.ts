import {
  loginEmailInputClassname,
  loginPasswordInputClassname,
  logoutLinkClassname,
} from "./test-constants";

export const loginAdmin = () => {
  indexedDB.deleteDatabase("firebaseLocalStorageDb");

  cy.visit("/login");

  const adminEmail = Cypress.env("admin_email");
  const adminPassword = Cypress.env("admin_password");

  cy.get(loginEmailInputClassname).type(adminEmail);
  cy.get(loginPasswordInputClassname).type(adminPassword);
  cy.contains("button", "Log in").click();
};

export const logoutAdmin = () => {
  cy.get("[data-testid=back-home]").click();

  // cy.findByText("Back Home").click();
  // cy.wait(3000);
  // cy.findByText("Back Home").click();
  cy.get(logoutLinkClassname).click();
};

export const goToLoginAndFillInForm = (correctCredentials = false) => {
  cy.visit("/login");

  const adminEmail = Cypress.env("admin_email");
  const adminPassword = Cypress.env("admin_password");

  cy.get(loginEmailInputClassname).type(adminEmail);

  const password = correctCredentials ? adminPassword : "555555555";

  cy.get(loginPasswordInputClassname).type(password);
};

export const logout = () => {
  cy.findByText("Log out").click();
};

export const checkPasswordToggle = () => {
  cy.get(".show-password").click();
  cy.get(".hide-password").should("exist");
  cy.get(".password-input input[type=text]").should("exist");
  cy.get(".hide-password").click();
  cy.get(".password-input input[type=password]").should("exist");
};

export const resetPassword = (email: string) => {
  cy.get(".forgot-password-input").type(email);
  cy.contains("button", "Reset password").click();
};