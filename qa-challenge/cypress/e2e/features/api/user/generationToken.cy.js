import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor'

let requestBody

Given('eu tenho o cliente {string} e a senha {string}', (username, password) => {
  requestBody = {
    userName: username,
    password: password
  }
})

When('eu envio uma solicitação POST para {string}', (endpoint) => {
  cy.request({
    method: 'POST',
    url: `https://demoqa.com${endpoint}`,
    body: requestBody,
    failOnStatusCode: false
  }).as('apiResponse')
})

Then('o status da retorno deve ser {int}', (statusCode) => {
  cy.get('@apiResponse').its('status').should('eq', statusCode)
})

