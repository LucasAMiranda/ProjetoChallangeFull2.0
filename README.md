# ProjetoChallangeFull2.0

**Inicie um ambiente Virtual**

` python -m venv venv `

**Ative um ambinte virtual**

` venv\Scripts\activate `

` source venv/bin/activate `

**Crie um superuser no DjangoAdmin e DjangoRest**

`python manage.py createsuperuser`

**Acesse o DjangoAdmin para cadastro de vendas, produtos e vendedores**

`http://localhost:8000/admin`

**Acesse o DjangoRest para ver se a api está retornando corretamente**

`http://localhost:8000/api-auth/login`

**OBS: Eu não consegui executar o npm run build para juntar todo o projeto django com o reactjs e rodar a aplicação juntas. Então será
necessário executar separadamente o projeto django e reactjs com os comando `python manage.py runserver` para django e `npm start` para
o projeto reactjs. Verifique as rotas como estão trabalhando no App.js do projeto reactjs, também verifique as rotas para api do django
nas urls.py da aplicação django e verifique também nos components para ver se está batendo com o da urls.py usando axios para fazer as requisições, Verifique a api do DjangoRest para testar quando cadastra um vendedor, cliente e venda retorna os dados pela api.**

