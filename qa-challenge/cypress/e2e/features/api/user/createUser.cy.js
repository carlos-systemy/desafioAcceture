import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('o usuário {string} e a senha {string}', (username, password) => {
  const requestBody = {
    userName: username,
    password: password
  }
  cy.wrap(requestBody).as('requestBody')
})

When('eu envio o POST para {string}', (endpoint) => {
  cy.get('@requestBody').then((body) => {
    cy.request({
      method: 'POST',
      url: `https://demoqa.com${endpoint}`,
      body,
      headers: {
        Authorization: `teste`
      },
      failOnStatusCode: false
    }).as('apiResponse')
  })
})

Then('status da retorno deve ser {int}', (statusCode) => {
  cy.get('@apiResponse').its('status').should('eq', statusCode)
})
