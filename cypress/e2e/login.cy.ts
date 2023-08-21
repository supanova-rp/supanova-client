import {
  checkPasswordToggle,
  goToLoginAndFillInForm,
  logout
} from "../support/auth-utils";

describe("Login", () => {
  it("logs in with wrong credentials and navigates away", () => {
    goToLoginAndFillInForm();
    checkPasswordToggle();
    cy.contains("button", "Log in").click();
    cy.findByText("Wrong email and/or password").should("exist");
    cy.findByText("Register").click();
    cy.findByText("Login").click();
    cy.findByText("Wrong email and/or password").should("not.exist");
  });

  it("logs in with correct credentials", () => {
    goToLoginAndFillInForm(true);
    cy.contains("button", "Log in").click();
    logout();
  });
});