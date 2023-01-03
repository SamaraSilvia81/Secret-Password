
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
- JS: 
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

- `Constructor:` Função usada na instanciação dos objetos criados a partir da classe. Logo, quando eu chamar a minha classe é o construtor que será ativado, por isso coloquei o input como elemento principal para exibir as senhas criadas, já que as funções estarão atuando em cima dele.
- `Button:` Os métodos _btnCreatePassword_, _btnDeleteLocalStorage_ e _btnCopyPassword_ são funções específicas para capturar os botões de criar a senha, deletar a lista de senha e capturar a cópia das senhas.
- `CreatePassword:` É a função principal, sendo usada para criar as senhas a partir dos parâmetros que são os eventos de click da checkbox. Com isso, se os valores desses "checks" forem true, então serão armazenados dentro de um array que junto com laço de repetição criará um número aleatório com esses dados ao invés de números em si, dispondo tudo dentro da variável "password" que será manipulada em outras funções.


  
## Resultado
![Cópia](https://user-images.githubusercontent.com/113690864/209976165-a69ab41d-d72b-4d8a-a269-83c71a503557.gif)
