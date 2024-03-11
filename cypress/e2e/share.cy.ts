describe("Share screen", () => {
  it("Share video", () => {
    cy.visit("http://localhost:3000/");
    cy.get('input[type="text"]').type("quan@gmail.com");
    cy.get('input[type="password"]').type("quang123");
    cy.contains("Login/Register").click();
    cy.get('[data-cy="share"]').click();
    cy.url().should("include", "/share");
    cy.contains("Share your awesome videos here");

    cy.get('input[type="text"]').type(
      "https://www.youtube.com/watch?v=wvcSGGdnnII"
    );
    cy.get("[data-cy=share-button]").click();
    cy.contains("Video shared Successful!");
  });
});
