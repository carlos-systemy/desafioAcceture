const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

let accessToken = '';
let userID = '';

Given(/^I have the API endpoint "([^"]*)"$/, (endpoint) => {
  cy.wrap(endpoint).as('endpoint');
});

When(/^I send a POST request with valid user details$/, function () {
  const userDetails = {
    userName: "t24",
    password: "Password@123"
  };

  cy.get('@endpoint').then(endpoint => {
    cy.request('POST', `${endpoint}/`, userDetails).then(response => {
      expect(response.status).to.equal(201);
      userID = response.body.userID;
      expect(userID).to.exist;
    });
  });
});
Then(/^the API should return a success response with the user ID$/, function () {
  expect(userID, 'userID deve existir').to.exist;
});

Given(/^I have the user credentials$/, function () {
  cy.wrap({
    userName: "t24",
    password: "Password@123"
  }).as('credentials');
});

When(/^I send a POST request to generate a token$/, function () {
  cy.get('@endpoint').then(endpoint => {
    cy.get('@credentials').then(credentials => {
      cy.request('POST', `${endpoint}/`, credentials).then(response => {
        expect(response.status).to.equal(200);
        accessToken = response.body.token;
        expect(accessToken).to.exist;
      });
    });
  });
});

Then(/^the API should return a valid access token$/, function () {
  expect(accessToken).to.exist;
});

Given("I have the access token and user credentials", function () {
  const credentials = {
    userName: "t2",
    password: "Password@123"
  };
  cy.wrap(credentials).as("credentials");

  cy.request("POST", "https://demoqa.com/Account/v1/GenerateToken", credentials)
    .then((response) => {
      expect(response.status).to.eq(200);
      const accessToken = response.body.token;
      expect(accessToken).to.exist;
      cy.wrap(accessToken).as("accessToken");
    });
});



When(/^I send a POST request to verify the user authorization$/, function () {
  cy.get('@endpoint').then(endpoint => {
    cy.get('@credentials').then(credentials => {
      cy.request({
        method: 'POST',
        url: `${endpoint}/`,
        body: credentials,
        failOnStatusCode: false
      }).then(response => {
        cy.wrap(response).as('authResponse');
      });
    });
  });
});

Then("the API should confirm the user is authorized", function () {
  cy.get('@authResponse').then(response => {
    expect(response.status).to.equal(200);
    expect(response.body).to.equal(true);
  });
});


When(/^I send a GET request to list available books$/, function () {
  cy.get('@endpoint').then(endpoint => {
    cy.request('GET', `${endpoint}/`).then(response => {
      cy.wrap(response).as('booksResponse');  
    });
  });
});
Then(/^the API should return a list of available books$/, function () {
  cy.get('@booksResponse').then(response => {
    expect(response.status).to.equal(200);
    expect(response.body.books).to.be.an('array');
  });
});

When(/^I send a POST request to reserve two books of my choice$/, function () {
  const booksToReserve = ["9781449325862", "9781449331818"]; 

  const userID = Cypress.env('userID');
  const accessToken = Cypress.env('accessToken');

  cy.get('@endpoint').then(endpoint => {
    cy.request({
      method: 'POST',
      url: `https://demoqa.com/BookStore/v1/Books`, 
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: {
        userId: userID,
        collectionOfIsbns: booksToReserve.map(isbn => ({ isbn }))
      }
    }).then(response => {
      expect(response.status).to.equal(201); 
      expect(response.body).to.exist;
    });
  });
});


