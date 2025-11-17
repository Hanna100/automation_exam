describe('Intercept 3 government API requests and verify status 200', () => {

    beforeEach(() => {

      // 1 - GetServices
      cy.intercept(
        'GET',
        'https://www.gov.il/govilHF/api/GetServices?culture=he'
      ).as('getServices');

      // 2 - GetAggregationForOffices
      cy.intercept(
        'GET',
        'https://www.gov.il/he/BureausWebApi/bureaus/GetAggregationForOffices'
      ).as('getAggregation');

      // 3 - GetTaxonomiesList
      cy.intercept(
        'GET',
        'https://www.gov.il/he/BureausWebApi/bureaus/GetTaxonomiesList?collectionName=cities'
      ).as('getCities');

      cy.visit('https://www.gov.il/he/government-service-branches');
    });

    it('All 3 API responses return status 200', () => {

      cy.wait('@getServices').then((req) => {
        expect(req.response.statusCode).to.eq(200);
      });

      cy.wait('@getAggregation').then((req) => {
        expect(req.response.statusCode).to.eq(200);
      });

      cy.wait('@getCities').then((req) => {
        expect(req.response.statusCode).to.eq(200);
      });

    });

  });
