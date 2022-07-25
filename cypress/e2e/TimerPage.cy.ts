describe("Check Link", () => {
  it("Valid Test: Timer Page Exists", () => {
    cy.visit("http://localhost:3000/timer");
    cy.url().should("include", "/timer");
  });
});

export {};
