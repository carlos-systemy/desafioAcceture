import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

let requestBody
let response

Given('que eu tenho o usuário {string} e a senha {string}', (username, password) => {
  requestBody = {
    userName: username,
    password: password
  }
})

When('eu envio uma requisição POST para {string}', (endpoint) => {
  cy.request({
    method: 'POST',
    url: `https://demoqa.com${endpoint}`,
    body: requestBody,
    failOnStatusCode: false 
  }).then((res) => {
    response = res
  })
})

Then('o status da resposta deve ser {int}', (statusCode) => {
  expect(response.status).to.eq(statusCode)
})
