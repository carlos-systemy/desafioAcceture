Feature: Verificar autorização de usuário na API

  Scenario: Usuário autorizado com credenciais válidas
    Given que eu tenho o usuário "testuser" e a senha "Test@123"
    When eu envio uma requisição POST para "/Account/v1/Authorized"
  

  Scenario: Usuário com senha inválida
    Given que eu tenho o usuário "testuser" e a senha "senhaErrada"
    When eu envio uma requisição POST para "/Account/v1/Authorized"
    
  
  Scenario: Usuário inexistente
    Given que eu tenho o usuário "usuarioNaoExiste" e a senha "Qualquer123"
    When eu envio uma requisição POST para "/Account/v1/Authorized"
    
    
