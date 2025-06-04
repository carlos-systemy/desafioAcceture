Feature: Testar API de criação de usuário - /Account/v1/User

  Scenario: Criar usuário com dados válidos
    Given o usuário "usuarioTeste" e a senha "Senha@123"
    When eu envio o POST para "/Account/v1/User"
    Then status da retorno deve ser 406
    

  Scenario: Criar usuário com dados inválidos (senha errada)
    Given o usuário "usuarioTeste" e a senha "senhaE5@rrada"
    When eu envio o POST para "/Account/v1/User"
    Then status da retorno deve ser 406
