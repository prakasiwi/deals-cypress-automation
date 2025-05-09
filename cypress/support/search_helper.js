import roleData from '../fixtures/filter.json';

export const searchAndValidate = (keyword, field, isArray = false) => {
  cy.intercept('GET', 'https://api-dev.sejutacita.id/v2/mentoring/mentor/list*').as('searchMentor');
  cy.get('#searchMentor').clear().type(keyword + '{enter}');
  cy.wait('@searchMentor').then((interception) => {
    const response = interception.response.body;
    expect(interception.response.statusCode).to.eq(200);
    response.data.docs.forEach((mentor) => {
      const value = mentor[field];

      if (value === undefined || value === null) {
        throw new Error(`Field "${field}" not found in mentor data.`);
      }

      if (isArray) {
        const text = Array.isArray(value) ? value.join(', ') : String(value);
        expect(text.toLowerCase()).to.include(keyword.toLowerCase());
      } else {
        const text = typeof value === 'string' ? value : String(value);
        expect(text.toLowerCase()).to.include(keyword.toLowerCase());
      }
    });
  });
};


  export const roleLevelFilter = () => {
    cy.intercept('GET', 'https://api-dev.sejutacita.id/v2/mentoring/mentor/list*').as('roleLevel');
    cy.wait('@roleLevel').then((intercept) => {
        const url = new URL(intercept.request.url);
        const params = new URLSearchParams(url.search);
        const actualIds = params.getAll('role_level_id_in')
        const roleMap = roleData[1]
        const expectIds = Object.values(roleMap)
        const expectedSubset = expectIds.slice(0, 4);
        expect(actualIds.sort()).to.include.members(expectedSubset)
    })
  }
  