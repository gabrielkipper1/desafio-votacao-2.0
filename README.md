## Configurar API

* Crie um arquivo .env seguindo o modelo fornecido.
* O banco de dados usado no desenvolvimento foi postgres, mas deve funcionar normalmente com mysql(porém não foi testado)
* Dentro do postgres, crie um banco de dados chamado "voting-app". As migrations do typeorm vão fazer o trabalho de criar o modelo do banco de dados.

* Execute o comando para instalar as dependências e rodas o projeto
```bash
npm install && npm start
```

## Teste API
Para rodar os testes execute
```bash
npm test
```
Atualmente o backend está com 73 testes. Para testar o repository do typeorm, que funciona em postgres/mysql foi utilizado sqlite. o tipo DateTime/Timestamp não é compatível nos dois bancos de dados e para isso os schemas que utilizavam esse tipo de dado fora reescritos. Também foi gerado um arquivos de conexao específico para o sqlite. Nos testes o tipo de repository injetado foi o utilizado na aplicação de produção.

## Conta administrador
Há uma transaction do typeorm responsável por adicionar um usuário como administrador, ele será executada após a criação do banco de dados
```bash
email : admin@test.com
senha : admin
cpf: 35207752049
```

## Documentação da API
https://documenter.getpostman.com/view/5983381/2sA2r6Y4hr#1e9a3c64-0a09-4774-b67f-8260437fceca


## Arquitetura
  Foi optado por usar uma arquitetura baseada em clean architecture, onde podemos separar as responsabilidades de cada componente do sistema e também evitamos poluir as nossa entidades e regras de negócio com dependências de pacotes externos que podem ser alterados e depreciados a qualquer momentos.

As requisições feitas por um cliente externo passam pelo sistema de rotas do servidor, que ficam responsáveis por encapsular dados recebidos na requisição e encaminhar o que for necessário para a próxima etapa: os controllers.
Os controllers ficam responsáveis por verificar e validar as regras de negócio e os dados necessários para que as ações possam ser tomadas(ex: verificar que todos os dados necessário para criar uma conta de usuário foram recebidas). 

Caso algum dado não esteja correto ou não esteja satisfazendo as regras de negócio, o controller irá rejeitar a solicitação e retornar uma exception, que será devolvida para o cliente do usuário.
Os controllers se comunicam com os fontes externas de dados utilizando interfaces, fazendo o uso do padrão de projeto conhecido como repository. Os controllers possuem apenas um referência para a abstração do repository e faz as chamadas para a mesma.

As interfaces do repository devem ser implementadas por fontes de dados e/ou pacotes externos que queiram se comunicar com o sistema. Neste projeto foi utilizado typeorm para mapear as entidades e fazer operações de CRUD de maneira mais fácil. Neste caso, é nossa responsabilidade implementar as interfaces de repository utilizando o typeorm e suas dependências. 

Uma das vantagens de utilizar um sistema em camadas seria a fácil substituição de partes da aplicação sem alterar o funcionamento da mesma. Poderíamos substituir a implementação do typeorm por outro framework ORM, como o prisma, por exemplo, ou até mesmo usar SQL puro, e nosso sistema funcionaria da mesma maneira(desde que a implementação esteja correta e siga o que foi definido nas interfaces), aplicando assim o princípio open-closed de SOLID. Para facilitar essas substituições pode ser utilizado um sistema de injeção de dependência(nao foi implementado no projeto para não se estender muito)

#### Typeorm
Para auxiliar nas operações de CRUD foi utilizado o typeorm. Para cada entidade do sistema que deve ser salva no banco de dados, criamos uma definição de schema, seguindo as orientações da documentação do typeorm. Desta maneira conseguimos separar o núcleo do nosso sistema das dependências do typeorm.
O mesmo ocorre com as operações de CRUD, que devem ser feitas em uma classe separada que implementa uma interface de repository definida anteriormente, onde cada método tem bem definido o tipo de operação a ser feita, seu parâmetros e tipo de retorno.

#### Bcrypt
Para codificar as senhas do usuário, foi utilizado bcrypt, um algoritmo muito popular que foi projetado para ser resistente a ataques de força bruta ao fazer uso de mais poder computacional e ser mais lento do que outros algoritmos de hashing. Para não gerarmos uma dependência do pacote externo do bcrypt dentro da API foi criado uma interface(PasswordEncoder) que é responsável por intermediar a codificação e decodificação das senhas. Implementamos essa para utilizarmos o bcrypt de forma isolada, sem interferir em nossas regras de negócio e núcleo o sistema.

#### JWT
A autenticação do usuário é feita por JWT, um padrão aberto que é altamente usado em APIs e aplicações web. A interface responsável por fazer o isolamento e a comunicação do nosso sistema com as dependências do JWT se chama TokenEncoder, e ao implementar-la, novamente isolamos nosso sistema de dependências externas.

#### Middlewares
Foram implementados dois middlewares: um para a verificação do JWT em rotas protegidas, e outro para interceptar erros sem a necessidade de blocos try/catch em toda aplicação.

#### Versionamento da API
Para versionar a api foi utilizado um padrao de rotas /api/${version}. Cada nova versão possui seu próprio arquivo de rotas. Apesar de fácil implementação, em um cenário onde as mudanças na API sejam grandes talvez a melhor solução seria subir duas versões diferentes da API e utilizar um proxy reverso para direcionar as chamadas de acordo com a versão solicitada.


# App Angular

### Executar
```bash
npm install && ng serve -o
```

### Testes (com percentual de cobertura)
```bash
ng test --no-watch --code-coverage
```
Atualmente o frontend está com 112 testes, com cobertura de aproximadamente 50%, que verificam se as telas e componentes possuem todos campos e chamam os métodos solicitados

O projeto frontend foi divido em componentes e telas: cada tela é um conjunto de componentes, e cada componente é um elemento de uma tela.

O app possui sete telas(login, cadastro, home, detalhes, usuários, votar e criar tópico).

A rota inicial "/" redireciona para "/home", que é um rota sem proteção, nela podem ser vistos as votações abertas e que podem ser filtradas pelo campo de texto na parte superior(filtro por categoria). 
caso o usuário seja um administrador: haverá um botão para criar novas pautas, um botao para acessar a área de usários e serão listados TODOS os tópicos e nao somente os que estão com votação ativa`.

Quando um administrador acessar a tela de usuários, ele poderá ver a listagem completa de todos que estão cadastrados na plataforma, e também poderá adicionar e remover administradores, estando bloqueado somente se auto remover das lista de administradores.

A tela de votação é protegida, e requer que o usuário esteja logado. caso nao esteja, será redirecionado para o login e após entrar, será redirecionado de volta para a tela de votação.

Caso o usuário nao possua uma conta, ele pode criar uma, será solicitado nome, email, cpf e senha(com confirmação). Para validar o voto é necessário informar o cpf vinculado que foi vinculado a conta na hora do cadastro.

Na tela de detalhes podemos ver os dados da pauta e o resultado da votação.

Na tela de criação de pauta, inserimos os dados necessários para criar um nova votação. Apenas administradores podem acessar essa tela e criar pautas, esta rota é protegida por um AdminGuard.

a maior parte das telas e componentes estão testados, garantindo que todos campos necessários para o funcionamento estão disponíveis e que em caso de erro, cada componente sabe como se comportar sem depender da nada externo.

Para buscar dados que são exibidos na tela foi utilizado async pipe, e também foi criado um pipe customizado para mostrar a contagem regressiva da sessão de votação

