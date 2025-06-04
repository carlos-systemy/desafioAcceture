
Feature: User Bookstore API Workflow  
  As an API user, I want to create a user, authorize them, and manage book reservations  
  So that I can validate the complete workflow of the system  

  Scenario: Create a new user  
    Given I have the API endpoint "https://demoqa.com/Account/v1/User"  
    When I send a POST request with valid user details  
    Then the API should return a success response with the user ID  

  Scenario: Generate an access token  
    Given I have the API endpoint "https://demoqa.com/Account/v1/GenerateToken"  
    And I have the user credentials  
    When I send a POST request to generate a token  
    Then the API should return a valid access token  

  Scenario: Verify user authorization  
    Given I have the API endpoint "https://demoqa.com/Account/v1/Authorized"  
    And I have the access token and user credentials  
    When I send a POST request to verify the user authorization  
    Then the API should confirm the user is authorized  

  Scenario: List available books  
    Given I have the API endpoint "https://demoqa.com/BookStore/v1/Books"  
    When I send a GET request to list available books  
    Then the API should return a list of available books  

  Scenario: Reserve two books  
    Given I have the API endpoint "https://demoqa.com/BookStore/v1/Books"  
    And I have the user ID and access token  
    When I send a POST request to reserve two books of my choice  
    Then the API should confirm the books have been reserved  

  Scenario: List user details with reserved books  
    Given I have the API endpoint "https://demoqa.com/Account/v1/User/{userID}"  
    And I have the user ID and access token  
    When I send a GET request to retrieve user details  
    Then the API should return the user details, including the reserved books  
