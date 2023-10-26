import { feedbackMessages } from "../support/test-constants";
import { resetPassword } from "../support/auth-utils";

describe("Forgot Password", () => {
  beforeEach(() => {
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
    cy.visit("/forgot-password");
    cy.findByText("Forgot password?").click();
  });

  it("resets password with no account and navigates away", () => {
    resetPassword("abcd@gmail.com");
    cy.findByText(feedbackMessages.accountInvalid).should("exist");
    cy.findByText("Login").click();
    cy.findByText("Forgot password?").click();
    cy.findByText(feedbackMessages.accountInvalid).should("not.exist");
  });

  it("resets password with account", () => {
    const adminEmail = Cypress.env("admin_email");

    resetPassword(adminEmail);
    cy.findByText(feedbackMessages.passwordResetSuccess).should("exist");
    cy.wait(3000);
    cy.findByText(feedbackMessages.passwordResetSuccess).should("not.exist");
  });
});