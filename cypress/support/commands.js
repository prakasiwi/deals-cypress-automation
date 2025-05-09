export const commonMentoringCheck = () => {
    cy.url().should("include", "/mentoring");
    cy.get('.fixed > [href="/mentoring"]');
    cy.get("#searchMentor").scrollIntoView();
  };
  