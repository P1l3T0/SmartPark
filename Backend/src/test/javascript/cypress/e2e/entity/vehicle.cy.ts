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

describe('Vehicle e2e test', () => {
  const vehiclePageUrl = '/vehicle';
  const vehiclePageUrlPattern = new RegExp('/vehicle(\\?.*)?$');
  let username: string;
  let password: string;
  // const vehicleSample = {"dateCreated":"2026-05-10T22:08:56.455Z","registrationNumber":"carboxyl huzzah","model":"aha yahoo mmm","brand":"yum mediocre"};

  let vehicle;
  // let userProfile;

  before(() => {
    cy.credentials().then(credentials => {
      ({ username, password } = credentials);
    });
  });

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/user-profiles',
      body: {"phoneNumber":"after","photoUrl":"excepting","dateCreated":"2026-05-11T03:27:23.755Z","dateUpdated":"2026-05-11T15:29:18.765Z"},
    }).then(({ body }) => {
      userProfile = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/vehicles+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/vehicles').as('postEntityRequest');
    cy.intercept('DELETE', '/api/vehicles/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/bookings', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/user-profiles', {
      statusCode: 200,
      body: [userProfile],
    });

  });
   */

  afterEach(() => {
    if (vehicle) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/vehicles/${vehicle.id}`,
      }).then(() => {
        vehicle = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (userProfile) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/user-profiles/${userProfile.id}`,
      }).then(() => {
        userProfile = undefined;
      });
    }
  });
   */

  it('Vehicles menu should load Vehicles page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('vehicle');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Vehicle').should('exist');
    cy.url().should('match', vehiclePageUrlPattern);
  });

  describe('Vehicle page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(vehiclePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Vehicle page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/vehicle/new$'));
        cy.getEntityCreateUpdateHeading('Vehicle');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', vehiclePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/vehicles',
          body: {
            ...vehicleSample,
            owner: userProfile,
          },
        }).then(({ body }) => {
          vehicle = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/vehicles+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/vehicles?page=0&size=20>; rel="last",<http://localhost/api/vehicles?page=0&size=20>; rel="first"',
              },
              body: [vehicle],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(vehiclePageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(vehiclePageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response?.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details Vehicle page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('vehicle');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', vehiclePageUrlPattern);
      });

      it('edit button click should load edit Vehicle page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Vehicle');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', vehiclePageUrlPattern);
      });

      it('edit button click should load edit Vehicle page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Vehicle');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', vehiclePageUrlPattern);
      });

      // Reason: cannot create a required entity with relationship with required relationships.
      it.skip('last delete button click should delete instance of Vehicle', () => {
        cy.intercept('GET', '/api/vehicles/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('vehicle').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', vehiclePageUrlPattern);

        vehicle = undefined;
      });
    });
  });

  describe('new Vehicle page', () => {
    beforeEach(() => {
      cy.visit(vehiclePageUrl);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Vehicle');
    });

    // Reason: cannot create a required entity with relationship with required relationships.
    it.skip('should create an instance of Vehicle', () => {
      cy.get(`[data-cy="dateCreated"]`).type('2026-05-11T11:22');
      cy.get(`[data-cy="dateCreated"]`).blur();
      cy.get(`[data-cy="dateCreated"]`).should('have.value', '2026-05-11T11:22');

      cy.get(`[data-cy="registrationNumber"]`).type('actual');
      cy.get(`[data-cy="registrationNumber"]`).should('have.value', 'actual');

      cy.get(`[data-cy="model"]`).type('phooey clonk');
      cy.get(`[data-cy="model"]`).should('have.value', 'phooey clonk');

      cy.get(`[data-cy="brand"]`).type('shore geez');
      cy.get(`[data-cy="brand"]`).should('have.value', 'shore geez');

      cy.get(`[data-cy="isPrimary"]`).should('not.be.checked');
      cy.get(`[data-cy="isPrimary"]`).click();
      cy.get(`[data-cy="isPrimary"]`).should('be.checked');

      cy.get(`[data-cy="owner"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        vehicle = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', vehiclePageUrlPattern);
    });
  });
});
