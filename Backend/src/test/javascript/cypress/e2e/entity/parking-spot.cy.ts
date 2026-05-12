import {
  entityConfirmDeleteButtonSelector,
  entityCreateButtonSelector,
  entityCreateCancelButtonSelector,
  entityCreateSaveButtonSelector,
  entityDeleteButtonSelector,
  entityDetailsBackButtonSelector,
  entityDetailsButtonSelector,
  entityEditButtonSelector,
  entityTableSelector,
} from '../../support/entity';

describe('ParkingSpot e2e test', () => {
  const parkingSpotPageUrl = '/parking-spot';
  const parkingSpotPageUrlPattern = new RegExp('/parking-spot(\\?.*)?$');
  let username: string;
  let password: string;
  const parkingSpotSample = { dateCreated: '2026-05-11T07:22:28.917Z', slotNumber: 'reproachfully while' };

  let parkingSpot;

  before(() => {
    cy.credentials().then(credentials => {
      ({ username, password } = credentials);
    });
  });

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/parking-spots+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/parking-spots').as('postEntityRequest');
    cy.intercept('DELETE', '/api/parking-spots/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (parkingSpot) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/parking-spots/${parkingSpot.id}`,
      }).then(() => {
        parkingSpot = undefined;
      });
    }
  });

  it('ParkingSpots menu should load ParkingSpots page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('parking-spot');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ParkingSpot').should('exist');
    cy.url().should('match', parkingSpotPageUrlPattern);
  });

  describe('ParkingSpot page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(parkingSpotPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ParkingSpot page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/parking-spot/new$'));
        cy.getEntityCreateUpdateHeading('ParkingSpot');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', parkingSpotPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/parking-spots',
          body: parkingSpotSample,
        }).then(({ body }) => {
          parkingSpot = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/parking-spots+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/parking-spots?page=0&size=20>; rel="last",<http://localhost/api/parking-spots?page=0&size=20>; rel="first"',
              },
              body: [parkingSpot],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(parkingSpotPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ParkingSpot page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('parkingSpot');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', parkingSpotPageUrlPattern);
      });

      it('edit button click should load edit ParkingSpot page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ParkingSpot');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', parkingSpotPageUrlPattern);
      });

      it('edit button click should load edit ParkingSpot page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ParkingSpot');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', parkingSpotPageUrlPattern);
      });

      it('last delete button click should delete instance of ParkingSpot', () => {
        cy.intercept('GET', '/api/parking-spots/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('parkingSpot').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', parkingSpotPageUrlPattern);

        parkingSpot = undefined;
      });
    });
  });

  describe('new ParkingSpot page', () => {
    beforeEach(() => {
      cy.visit(parkingSpotPageUrl);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ParkingSpot');
    });

    it('should create an instance of ParkingSpot', () => {
      cy.get(`[data-cy="dateCreated"]`).type('2026-05-11T13:26');
      cy.get(`[data-cy="dateCreated"]`).blur();
      cy.get(`[data-cy="dateCreated"]`).should('have.value', '2026-05-11T13:26');

      cy.get(`[data-cy="slotNumber"]`).type('cone');
      cy.get(`[data-cy="slotNumber"]`).should('have.value', 'cone');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        parkingSpot = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', parkingSpotPageUrlPattern);
    });
  });
});
