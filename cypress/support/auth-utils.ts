import {
  loginEmailInputClassname,
  loginPasswordInputClassname,
  logoutLinkClassname,
} from "./test-constants";

export const login = () => {
  // TODO: figure out how to clear cookies
  cy.clearCookies();
  cy.visit("/login");
  cy.get(loginEmailInputClassname).type("jamiegarner123@gmail.com");
  cy.get(loginPasswordInputClassname).type("12345678");
  cy.contains("button", "Log in").click();
};

export const logout = () => {
  cy.findByText("Back Home").click();
  cy.get(logoutLinkClassname).click();
};