## Preparação

### Garantir que assimilei os seguintes conteúdos**

- [ ] [Dockerfile](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/5987fa2d-0d04-45b2-9d91-1c2ffce09862/day/da25fd46-8818-4234-8603-a442b047370f/lesson/822be635-e9da-4b46-8042-cbf537013935)
- [ ] [Sequelize Migrations](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/0ca77b1d-4770-4646-8368-167d2305e763/day/0da9bd44-abf6-43d6-96b9-9614274e6c36/lesson/cfc6c9f9-b329-4107-8e2b-6f8ff331bf28) 
- [ ] [Sequelize Models](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/0ca77b1d-4770-4646-8368-167d2305e763/day/0da9bd44-abf6-43d6-96b9-9614274e6c36/lesson/bd9d0dc0-6490-4cd9-ba49-55e7fd741ed9)
- [ ] [Sequelize Associations 1:N](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/0ca77b1d-4770-4646-8368-167d2305e763/day/94e113d7-6a86-4536-a1d3-08f55f557811/lesson/f678e6c0-4f4b-4560-956c-983c7530de5b)
- [ ] [Sequelize Associations N:N](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/0ca77b1d-4770-4646-8368-167d2305e763/day/22fa9643-5f27-41f5-943b-2c7cc1c67c01/lesson/61633419-08d8-467d-b0db-bc83375d4cfe)
- [ ] [Sequelize com Typescript](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/4e3b7d3a-94a1-4fce-9545-0f2b04f8ccd9/day/55580b57-6754-49bc-83bf-465967e0d2a1/lesson/70a59622-f05f-44cc-b3ce-6e5c28435f25)
- [ ] [Testes de Integração](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/2ed87e4f-9049-4314-8091-8f71b1925cf6/day/4684c963-8015-41ad-a901-eb37076d9ff5/lesson/45b8e257-cf4a-4bf9-8d4a-fdfce0a5837e)
- [ ] [Express com Typescript](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/4e3b7d3a-94a1-4fce-9545-0f2b04f8ccd9/day/c88d68dd-f399-4d5a-ad33-8d01fb4f4967/lesson/24259006-afa3-4f18-bcc4-f6be5bdfb861)
- [ ] [Autenticação com JWT](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/0ca77b1d-4770-4646-8368-167d2305e763/day/85fd2ed3-f6cc-4789-8990-7f5fe827422c/lesson/fd5502eb-974c-4c47-b93d-3180f0585b7a)
		
#### ⚠️ Importante ⚠️ 

👉 Não espere estar totalmente confortável com todos os itens para iniciar o projeto. O projeto, mais do que uma avaliação de aprendizagem, é o momento para você consolidar conhecimentos. O importante é dar o primeiro passo e começar lendo todos os requisitos para um entendimento amplo do que será feito.

👉 Leia o readme com atenção para um entendimento amplo do que será feito e comece a fazer o primeiro requisito. Se tiver alguma dificuldade em algum requisito, utilize o tópico anterior como um direcionador para sua pesquisa ao course e aos recursos adicionais.

### Primeiros passos:

- [ ] Já li o readme detalhadamente;
- [ ] Já li os arquivos package.json na raiz do projeto e no backend e entendi os scripts que estão à disposição. [Mais informações na issue](https://github.com/tryber/sd-022-a-trybe-futebol-clube/issues/1);
- [ ] Já li os arquivos docker-compose.yml e docker-compose.dev.yml e entendi as diferenças entre os dois;

### Configurações iniciais:

- [ ] Exclui todos os containers, imagens e volumes do docker (a fim de ganhar espaço e desempenho, além de evitar problemas de outros containers rodando na mesma porta);
- [ ] Executei o comando npm run postinstall (que executará o npm install dentro das minhas pastas de frontend e backend);
- [ ] Fiz as configurações necessárias do meu Dockerfile
- [ ] Executei o comando npm run compose: up:dev ( para que o docker-compose faça o up corretamente da minha aplicação)
- [ ] Estou usando `node` na versão `16.14.0 LTS`. [Instale o nvm](https://github.com/nvm-sh/nvm#installing-and-updating) para mudar de versão mais facilmente e rode os comandos abaixo:
   - `nvm install 16.14 --lts` baixa o node na versão especificada.
   - `nvm use 16.14` seleciona a versão para uso.
   - `nvm alias default 16.14` seta a versão como padrão.
- [ ] Estou usando `docker-compose` na versão `ˆ1.29.2`, use esse [link de referência para essa instalação no ubuntu do course](https://app.betrybe.com/course/back-end/docker/orquestrando-containers-com-docker-compose/6e8afaef-566a-47f2-9246-d3700db7a56a/conteudo/0006a231-1a10-48a2-ac82-9e03e205a231/instalacao/abe40727-6310-4ad8-bde6-fd1e919dadc0?use_case=side_bar), existe o link da documentação oficial com passos para [desinstalar](https://docs.docker.com/compose/install/#uninstallation) caso necessário
- [ ] Configurei minha `Dockerfile` do _frontend_ e do _backend_, copiando arquivos, instalando dependências e rodando a aplicação
- [ ] O Docker está adicionado no grupo de usuários (você consegue executar o comando `docker ps` sem o `sudo`). Solução [aqui](https://app.betrybe.com/course/back-end/docker/utilizando-containers-docker/208d7122-25f3-4135-b6bc-84ebb49665a8/conteudos/402b5d87-1d0d-4c5d-802c-032fd062868c/fazendo-a-instalacao-do-docker-engine/67685310-ebbc-4c7c-9f50-dacc0c7d84fc?use_case=side_bar)
- [ ] O comando `docker-compose up --build` roda sem erros no banco, no _back_ e no _front_
- [ ] Listei todas as dependências que usei extras (joi, boom, express-async-errors...) no backend em `app/backend/packages.npm`
- [ ] A _migration_ `app/backend/src/database/migrations/99999999999999-create-z.js` roda sem problemas quando se executa `npm run db:reset`
- [ ] Se já criei _migrations_ e _models_, renomeei as respectivas seeders, retirando os `_` do nome dos arquivos, mudando o padrão de `20211116145440-teams.js_` para `20211116145440-teams.js`

Seu Dockerfile deve ser capaz de instalar as depedências e subir a aplicação (tanto back-end como front-end). Portanto não é preciso entrar no container para instalar dependências ou iniciar a aplicação.

Vídeo de auxilio para as configurações iniciais: [Clique aqui](https://drive.google.com/file/d/1O_WXWUe9LP-mRXomqShK632p_lgIDjXW/view)

