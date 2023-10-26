import {
  checkPasswordToggle,
  goToLoginAndFillInForm,
  logout
} from "../support/auth-utils";
import { feedbackMessages } from "../support/test-constants";

describe("Login", () => {
  it("logs in with wrong credentials and navigates away", () => {
    goToLoginAndFillInForm();
    checkPasswordToggle();
    cy.contains("button", "Log in").click();
    cy.findByText(feedbackMessages.loginValidationError).should("exist");
    cy.findByText("Register").click();
    cy.findByText("Login").click();
    cy.findByText(feedbackMessages.loginValidationError).should("not.exist");
  });

  it("logs in with correct credentials", () => {
    goToLoginAndFillInForm(true);
    cy.contains("button", "Log in").click();
    logout();
  });
});