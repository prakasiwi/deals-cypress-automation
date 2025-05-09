import data from "../../fixtures/filter.json";
import { searchAndValidate } from "../../support/search_helper";
import { roleLevelFilter } from "../../support/search_helper";
import { commonMentoringCheck } from "../../support/commands";

describe("Search Career Mentor", () => {
  beforeEach(() => {
    cy.visit("/mentoring");
  });

  it("should load the mentoring page", () => {
    commonMentoringCheck();
  });

  const searchFields = ["name", "companyName", "campusName", "topicNames"];

  searchFields.forEach((field) => {
    it(`Search mentor by ${field}`, () => {
      const isArray = Array.isArray(data[0][field]);
      searchAndValidate(data[0][field], field, isArray);
    });
  });
});

describe("Search Academic Mentor", () => {
  beforeEach(() => {
    cy.visit("/mentoring?mTab=academics");
  });

  it("should load the mentoring page", () => {
    commonMentoringCheck();
  });

  const searchFields = ["name", "companyName", "campusName", "topicNames"];

  searchFields.forEach((field) => {
    it(`Search mentor by ${field}`, () => {
      const isArray = Array.isArray(data[0][field]);
      searchAndValidate(data[0][field], field, isArray);
    });
  });
});

describe("Search With Role Level Filter", () => {
  beforeEach(() => {
    cy.visit("/mentoring");
  });

  it("should load page with role level filter", () => {
    commonMentoringCheck();
    cy.get("button.lg\\:hidden").click();
    cy.get("#rc_select_3").click();
    cy.contains("span", "Associate / Officer").click();
    cy.contains("span", "C-level").click();
    cy.contains("span", "Director").click();
    cy.contains("span", "Intern").click();
    cy.contains("button", "Terapkan Filter").click();
    roleLevelFilter();

    //reset filter
    cy.get("button.lg\\:hidden").click();
    cy.get("#rc_select_5").click();
    cy.contains("button", "Reset").click();
    cy.contains("button", "Terapkan Filter").click();
  });
});

describe("Search With Expertise Career", () => {
  beforeEach(() => {
    cy.visit("/mentoring");
  });

  it("should load page with filter expertise", () => {
    commonMentoringCheck();
    cy.get('img[alt="Accounting"]').click();
    cy.get('img[alt="Art & Design"]').click();
    cy.get('img[alt="Data"]').click();
    cy.get('img[alt="Finance"]').click();
    cy.get('img[alt="HR"]').click();
    cy.get('img[alt^="Law &"]').click();
    cy.get('img[alt="IT & Eng"]').click();
    cy.get('img[alt="Product"]').click();
    cy.get('img[alt="Sales & Ops"]').click();
    cy.contains("a", "All").click();
  });
});

describe("Search With Expertise Academic ", () => {
  beforeEach(() => {
    cy.visit("/mentoring?mTab=academics");
  });

  it("should load page with filter expertise", () => {
    commonMentoringCheck();
    cy.get('img[alt="Beasiswa S1"]').click();
    cy.get('img[alt="Beasiswa S2"]').click();
    cy.get('img[alt^="IISMA"]').click();
    cy.get('img[alt^="Leadership"]').click();
    cy.get('img[alt="Study Abroad"]').click();
    cy.contains("a", "All").click();
  });
});
