import { resetPassword } from "../support/auth-utils";

describe("Forgot Password", () => {
  beforeEach(() => {
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
    cy.visit("/forgot-password");
    cy.findByText("Forgot password?").click();
  });

  it("resets password with no account and navigates away", () => {
    resetPassword("abcd@gmail.com");
    cy.findByText("Account doesn't exist. Please register first.").should("exist");
    cy.findByText("Login").click();
    cy.findByText("Forgot password?").click();
    cy.findByText("Account doesn't exist. Please register first.").should("not.exist");
  });

  it("resets password with account", () => {
    resetPassword("jamiegarner123@gmail.com");
    cy.findByText("Check your inbox for further instructions.").should("exist");
    cy.wait(4000);
    cy.findByText("Check your inbox for further instructions.").should("not.exist");
  });
});