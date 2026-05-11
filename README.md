# Desafio Técnico - Analista de Testes ColmeIA

## Sobre o Projeto

Este repositório contém a resolução do desafio proposto como desafio técnico no processo seletivo para Analista de Testes na ColmeIA. O foco utilizar Cypress para explorar a aplicação e identificar comportamentos inesperados, automatizando testes que validem as funcionalidades e evidenciem erros.

## Tecnologias e Boas Práticas

- Cypress: Framework principal.
- Page Objects Pattern (PoP): Para garantir a manutenibilidade e reutilização de código.
- Data-Driven Testing: Utilização de Fixtures para testar múltiplos cenários de entrada (ex: diversos formatos de e-mail).

## Arquitetura do Projeto

```
├── cypress/
│   ├── e2e/             # Suítes de testes (Login e Dashboard)
│   ├── fixtures/        # Dados
│   ├── support/
│   │   ├── pages/       # Classes Page Objects
```

## Relatório da Análise Técnica

Durante a exploração e automação, identifiquei comportamentos que divergem do esperado em um ambiente de produção e os listarei abaixo:

### Bugs de Funcionalidade

1. **Falta de Persistência:** Na página de Bancos de Dados, ao clicar no botão de "Recarregar Dados", atualizar o navegador ou navegar entre menus, os itens recém-criados são removidos da listagem (Estado não persistido no Backend/LocalStorage).

2. **Falha no Arquivamento:** Na página de Bancos de Dados o botão de "Arquivar" funciona como uma exclusão definitiva. Ao alternar para a visualização de "Itens Arquivados", a lista permanece vazia, impossibilitando a recuperação de dados.

3. **Falha de Autenticação (Broken Access Control):** As páginas internas do sistema (`/dashboard`, `/dashboard/*`) não possuem proteção de rota. É possível acessá-las diretamente via URL em uma aba anônima ou navegador sem sessão ativa, ignorando completamente a tela de login. Em um ambiente de produção isso representa uma vulnerabilidade crítica de segurança e exposição de dados.

4. **Ausência de Scroll (Overflow):** Na página de Bancos de Dados ao adicionar múltiplos itens na listagem de Banco de Dados, a página não apresenta barra de rolagem vertical. Isso impossibilita a visualização e interação com os itens localizados no final da tabela.

5. **Link Inativo:** O link "Esqueceu sua senha?" na tela de login não possui ação vinculada, impedindo o fluxo de recuperação de conta.

### Inconsistências de UI e Sugestões de Melhoria

1. **Modal de Login Incoerente:** Após inserir credenciais corretas, o sistema exibe um modal afirmando que o "login está incorreto", mas oferece o botão "Continuar" que, de forma contraditória, permite o acesso ao Dashboard.

2. **Mensagens de Erro Genéricas:** Ao inserir dados incorretos, o sistema exibe a mensagem "Usuário ou senha inválidos" simultaneamente em ambos os inputs. Além do erro gramatical (uso de "Usuário" para um campo rotulado como E-mail), a duplicidade não especifica onde está o erro de preenchimento.

3. **Vulnerabilidade em Limite de Caracteres:** O campo "Nome do Banco de Dados" não possui validação de max-length. Isso permite a inserção de strings excessivamente longas, causando quebra de layout na tabela e potencial sobrecarga no armazenamento de dados.

4. **Elementos "Placeholder" (Cosméticos):**

- Navbar: O logotipo e o menu de perfil do usuário são puramente estéticos, não possuindo links ou menus de configuração.
- Colmeia Forms: O link no menu lateral leva a uma página vazia. Recomendo desativar ou ocultar o acesso enquanto a funcionalidade estiver em desenvolvimento para evitar frustração do usuário.

5. **Implementação de `data-testid`:** Durante o desenvolvimento da automação, notei que os elementos não possuem identificadores únicos e estáveis. Recomenda-se a adoção do atributo data-testid em botões, inputs e containers críticos. Isso reduz a dependência de seletores CSS frágeis (como classes ou hierarquia de DOM), tornando os testes mais resilientes a mudanças de layout e melhorando a manutenção do projeto a longo prazo.

## Como rodar os testes

Instale as dependências:
`npm install`

Abra o Cypress (Interface Visual):
`npm run cy:open`

Rodar em modo Headless (Terminal):
`npm run cy:run`
