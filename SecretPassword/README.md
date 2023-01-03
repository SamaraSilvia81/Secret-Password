
![Cópia de Post Oficial Projetos Front End](https://user-images.githubusercontent.com/113690864/209975732-89816b90-db78-44f5-8836-aef04803e1c4.gif)

# Secret Password
![Badge Concluído](http://img.shields.io/static/v1?label=STATUS&message=Concluído&color=4a309d&style=for-the-badge)

## ABOUT US
> Este repositório tem como por objetivo apresentar o projeto final da minha trilha de estag como desenvolvedora front-end, tendo como intuito praticar os conhecimentos aprendidos.
  
## Links e Deploys
- `Secret Password:` http://secretpassword.surge.sh/

## Ferramentas e Tecnologias

- HTML: Linguagem de marcação usada para estruturar o site.
- CSS: Estilização para dar cor e trazer consigo aspectos de usabilidade para o usuário.
- JS: Lingaugem de programação de alto nível.
- Bootstrap: 
 
## Conteúdo
> A organização do projeto se divide em alguns assuntos que eu estudei/revisei alocados na pasta "Study" e o próprio projeto em si na pasta "Project".

- `Semântica:` Para fins de boas práticas utilizei o conceito de semântica no HTML, subdividindo o corpo do site em cabeçalho e parte principal, no qual a mesma terá duas seções: criar senha e a lista das senhas.
- `Checkbox:` Input especial para dá um status booleano a algum aspecto que eu queira, nesse caso é para os caracteres na minha senha.
- `Label:` Para fins de usabilidade foi utilizado esse elemento em cada input e button.
- `Range:` Input especial para ditar o tamanho da minha senha, sendo capturado o seu evento de "change".
- `Button:` Elemento geral que ao ser capturado no evento de click se conectará com o range e os checkboxs.
- `POO:` Para a aplicabilidade do JavaScript foi usado os conceitos e paradigmas de POO, além de algumas noções de "Análise de Projetos de Software" como o SOLID, respeitando um de seus princípios, no qual uma única classe, nesse caso função, corresponderá a apenas uma única responsabilidade. Ele foi usado como requisito da atividade, mas também serviu para deixar o código mais limpo e intuitivo.
- `Class:` Todo a lógica do projeto está disposta em uma única class "Generate Password", no qual possui métodos específicos para cada funcionalidade do projeto como,por exemplo, criar senha, colocar as senhas criadas em uma lista, copiar e colar, salvar os dados no localStorage e afins.
- `Local Storage:` Recurso usado para armazenar os dados web. Ele foi usado para caso o usuário não queira perder as senhas criadas, elas estarão no seu navegador, funcionando como um simples "banco de dados".

## Métodos da Classe "Generate Password"
> Classe mãe usada para compor todo projeto, tendo uma relação íntima de método com método a partir de chamadas expressas pelo "this".

- `Constructor:` Função usada na instanciação dos objetos criados a partir da classe. Logo, quando eu chamar a minha classe é o construtor que será ativado, por isso coloquei o input como elemento principal para exibir as senhas criadas, já que as funções estarão atuando em cima dele.

![image](https://user-images.githubusercontent.com/113690864/210354824-1ed0f654-a796-459f-a4a1-b2e24bc4ddd1.png)


- `ChangeInput:` Função usada para capturar o input range, com o intuito de ditar o tamanho das senhas criadas.

![image](https://user-images.githubusercontent.com/113690864/210355067-fa8ac2df-40a7-4952-aa6a-a08f65ab9eb8.png)


- `Button:` Os métodos _btnCreatePassword_, _btnDeleteLocalStorage_ e _btnCopyPassword_ são funções específicas para capturar os botões de criar a senha, deletar a lista de senha e capturar a cópia das senhas.

![image](https://user-images.githubusercontent.com/113690864/210354937-85425b13-6d43-4b6d-acd1-4a759da0a8fa.png)


- `CreatePassword:` É a função principal, sendo usada para criar as senhas a partir dos parâmetros que são os eventos de click da checkbox. Com isso, se os valores desses "checks" forem true, então serão armazenados dentro de um array que junto com laço de repetição criará um número aleatório com esses dados ao invés de números em si, dispondo tudo dentro da variável "password" que será manipulada em outras funções.

![image](https://user-images.githubusercontent.com/113690864/210355175-4b43e6bd-2bd3-4ba3-b7f1-939e226372d6.png)


- `UpdatePassword:` Uma das vastas funcionalidades do projeto é a possibilidade de você selecionar quais caracteres NÃO quer na sua senha. Portanto, foi criado essa função para atualizar a senha criada na função anterior, tudo a partir de uma manipulação de dados por um "for of", no qual verificará por condicionais se existe algo dentro do "input" respectivo a tal função e que se tal se assemelhará com uma das constantes criadas para letras maiúsculas, símbolos e afins identificar e o eliminar com o método splice().

![image](https://user-images.githubusercontent.com/113690864/210355262-ee61f74f-0741-487f-9abb-602d3f13e966.png)


- `saveLocalStorage:` É um método usado para _salvar a cada criação_ no local storage, sendo esses valores armazendos como objetos na variável "dataObj".

![image](https://user-images.githubusercontent.com/113690864/210355291-cb03c646-a8c0-494c-a838-0f6daa964db1.png)


- `listPassword:` É um método para literalmente listar todas as minhas senhas criadas. Nesse viés, usaremos os valores guardados na variável "dataObj", no qual será convertido para string e acessado cada valor por um "For in" e analisado por uma condicional e com isso enviar para o html, por meio de uma manipulação do dom "createTextNode".

![image](https://user-images.githubusercontent.com/113690864/210355326-9a5b90af-edc4-4cd7-a1d9-d8dc73d16c51.png)


- `reload:` É a função usada para atualizar a página após clicar no botão de deletar, visto que após primeiro se deleta no local storage e para que essa atualização seja vista no html é preciso um refresh na página.

![image](https://user-images.githubusercontent.com/113690864/210355361-419bfe47-69c7-4466-9f04-67ab9146e3e6.png)


## Resultado
![Cópia](https://user-images.githubusercontent.com/113690864/209976165-a69ab41d-d72b-4d8a-a269-83c71a503557.gif)
