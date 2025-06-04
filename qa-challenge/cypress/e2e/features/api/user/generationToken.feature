Feature: Gerar token de autenticação para o usuário

  Scenario: Gerar token com credenciais válidas
    Given eu tenho o cliente "usuarioValido" e a senha "Senha@123"
    When eu envio uma solicitação POST para "/Account/v1/GenerateToken"
    Then o status da retorno deve ser 200

  Scenario: Gerar token com usuário inválido
    Given eu tenho o cliente "" e a senha "senhaErrada"
    When eu envio uma solicitação POST para "/Account/v1/GenerateToken"
    Then o status da retorno deve ser 400
