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

describe('Booking e2e test', () => {
  const bookingPageUrl = '/booking';
  const bookingPageUrlPattern = new RegExp('/booking(\\?.*)?$');
  let username: string;
  let password: string;
  // const bookingSample = {"startDate":"2026-05-11T11:46:11.076Z","endDate":"2026-05-11T01:09:18.571Z","dateCreated":"2026-05-10T21:02:06.451Z","status":"EXPIRED"};

  let booking;
  // let userProfile;
  // let vehicle;
  // let parkingSpot;

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
      body: {"phoneNumber":"fat preheat","photoUrl":"colorfully pace","dateCreated":"2026-05-11T01:57:21.403Z","dateUpdated":"2026-05-11T13:39:13.414Z"},
    }).then(({ body }) => {
      userProfile = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/vehicles',
      body: {"dateCreated":"2026-05-10T20:45:05.172Z","registrationNumber":"recklessly gee uh-hu","model":"substantiate though likewise","brand":"super ick excepting","isPrimary":true,"status":"DISABLED"},
    }).then(({ body }) => {
      vehicle = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/parking-spots',
      body: {"dateCreated":"2026-05-11T02:50:04.261Z","slotNumber":"meh"},
    }).then(({ body }) => {
      parkingSpot = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/bookings+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/bookings').as('postEntityRequest');
    cy.intercept('DELETE', '/api/bookings/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/user-profiles', {
      statusCode: 200,
      body: [userProfile],
    });

    cy.intercept('GET', '/api/vehicles', {
      statusCode: 200,
      body: [vehicle],
    });

    cy.intercept('GET', '/api/parking-spots', {
      statusCode: 200,
      body: [parkingSpot],
    });

  });
   */

  afterEach(() => {
    if (booking) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/bookings/${booking.id}`,
      }).then(() => {
        booking = undefined;
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
    if (vehicle) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/vehicles/${vehicle.id}`,
      }).then(() => {
        vehicle = undefined;
      });
    }
    if (parkingSpot) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/parking-spots/${parkingSpot.id}`,
      }).then(() => {
        parkingSpot = undefined;
      });
    }
  });
   */

  it('Bookings menu should load Bookings page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('booking');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Booking').should('exist');
    cy.url().should('match', bookingPageUrlPattern);
  });

  describe('Booking page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(bookingPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Booking page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/booking/new$'));
        cy.getEntityCreateUpdateHeading('Booking');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', bookingPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/bookings',
          body: {
            ...bookingSample,
            userProfile: userProfile,
            vehicle: vehicle,
            parkingSpot: parkingSpot,
          },
        }).then(({ body }) => {
          booking = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/bookings+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/bookings?page=0&size=20>; rel="last",<http://localhost/api/bookings?page=0&size=20>; rel="first"',
              },
              body: [booking],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(bookingPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(bookingPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response?.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details Booking page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('booking');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', bookingPageUrlPattern);
      });

      it('edit button click should load edit Booking page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Booking');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', bookingPageUrlPattern);
      });

      it('edit button click should load edit Booking page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Booking');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', bookingPageUrlPattern);
      });

      // Reason: cannot create a required entity with relationship with required relationships.
      it.skip('last delete button click should delete instance of Booking', () => {
        cy.intercept('GET', '/api/bookings/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('booking').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', bookingPageUrlPattern);

        booking = undefined;
      });
    });
  });

  describe('new Booking page', () => {
    beforeEach(() => {
      cy.visit(bookingPageUrl);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Booking');
    });

    // Reason: cannot create a required entity with relationship with required relationships.
    it.skip('should create an instance of Booking', () => {
      cy.get(`[data-cy="startDate"]`).type('2026-05-11T04:46');
      cy.get(`[data-cy="startDate"]`).blur();
      cy.get(`[data-cy="startDate"]`).should('have.value', '2026-05-11T04:46');

      cy.get(`[data-cy="endDate"]`).type('2026-05-11T00:27');
      cy.get(`[data-cy="endDate"]`).blur();
      cy.get(`[data-cy="endDate"]`).should('have.value', '2026-05-11T00:27');

      cy.get(`[data-cy="dateCreated"]`).type('2026-05-10T20:04');
      cy.get(`[data-cy="dateCreated"]`).blur();
      cy.get(`[data-cy="dateCreated"]`).should('have.value', '2026-05-10T20:04');

      cy.get(`[data-cy="status"]`).select('CANCELLED');

      cy.get(`[data-cy="userProfile"]`).select(1);
      cy.get(`[data-cy="vehicle"]`).select(1);
      cy.get(`[data-cy="parkingSpot"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        booking = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', bookingPageUrlPattern);
    });
  });
});
