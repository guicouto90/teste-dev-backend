![Oli Saúde|100x397,20%](https://hs-7708371.f.hubspotfree.net/hub/7708371/hubfs/logo-olisaude.png?upscale=true&width=288&upscale=true&name=logo-olisaude.png)

# Desafio de criação de uma API desevolvido com as seguintes tecnologias:
- NodeJS;
- ExpressJS;
- MongoDB;
- Insomnia ou Postman.

# Intruções de uso:

Clone o respositório e instale as dependencias com o comando npm install ou acesse o seguinte link com o deploy da aplicação:
https://backend-api-test-olisaude.herokuapp.com/
  
A aplicação foi desenvolvida seguindo arquitetura MSC.
Os endpoints que foram desenvolvidos são:
- Método POST com o endpoint '/customers' para criação de novos clientes.
  Para criação de novos clientes é necessário preencher os seguintes campos:
  ```json
  {
    "name": "tipo string com minimo 3 caracteres",
    "birthDate": "tipo data padrão ISO8601 - 'YYYY-MM-DD'",
    "sex": "tipo string, e deve ser preenchid com 'male' ou 'female'",
    "healthProblems": "tipo array"
        [
          {
            "name": "tipo string com minimo 2 caracteres",
            "level": "tipo numero entre 1 e 2"
          }
        ]
  }
  ```
 - Método PUT com endpoint '/customers/:id' para edição de clientes já existentes.
    Para editar clientes existentes é necessário seguir o padrão de preenchimento com os campos exigidos no método POST. Utilizando o id para acessar um cliente especifico.
  - Método GET com endpoint '/customers' para acessar todos os clientes cadastrados.
  - Método GET com endpoint '/customers/:id' para acessar um cliente especifico com o seu id de cadastro.
  - Método DELETE com endpoint '/customers/:id' para deletar um cliente especifico com o seu id de cadastro.
  - Método GET com endpoint '/healthproblems' para listar os 10 primeiros clientes que possuem o maior risco de saúde.

  # Contato
  Qualquer dúvida ou sugestão, me contate por:
  Email: gui.couto90@yahoo.com.br
  LinkedIn: https://www.linkedin.com/in/guicouto90/
