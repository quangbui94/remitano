describe("App Navigation", () => {
  it("Visits the home page", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Movies");
  });

  it("Navigates to the share page", () => {
    cy.visit("http://localhost:3000/");
    cy.get('input[type="text"]').type("quan@gmail.com");
    cy.get('input[type="password"]').type("quang123");
    cy.contains("Login/Register").click();
    cy.get('[data-cy="share"]').click();
    cy.url().should("include", "/share");
    cy.contains("Share your awesome videos here");
  });

  it("Redirects to the home page when visiting an unknown route", () => {
    cy.visit("http://localhost:3000/unknown-route");
    cy.url().should("include", "/");
    cy.contains("Movies");
  });
});
