import {
  loginEmailInputClassname,
  loginPasswordInputClassname,
  logoutLinkClassname,
} from "./test-constants";

export const loginAdmin = () => {
  indexedDB.deleteDatabase("firebaseLocalStorageDb");

  cy.visit("/login");
  cy.get(loginEmailInputClassname).type("jamiegarner123@gmail.com");
  cy.get(loginPasswordInputClassname).type("12345678");
  cy.contains("button", "Log in").click();
};

export const logoutAdmin = () => {
  cy.findByText("Back Home").click();
  cy.get(logoutLinkClassname).click();
};

export const goToLoginAndFillInForm = (correctCredentials = false) => {
  cy.visit("/login");
  cy.get(loginEmailInputClassname).type("jamiegarner123@gmail.com");

  const password = correctCredentials ? "12345678" : "555555555";

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