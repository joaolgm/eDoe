<h3 align="center">
  Projeto de Desenvolvimento de Aplicações Corporativas Avançadas - eDoe.com
</h3>

<p align="center">
  <img src="https://lh3.googleusercontent.com/CialLrx1z-gxQBFmWHV_Bz-qy35TFjYHm7SC34IulYqkUQDmRc6glIpNHstyYu0C61-D-ILjk1VppH3Q54Ws54fmdo4fEl7gK24lMd_dx1J40JZjBM75Yh1Ru30SXksJPB2GgbAa" width="500" height="300">
</p>

  Muitas pessoas tem interesse em fazer doações, mas as vezes não tem o tempo necessário para encontrar onde doar ou como doar. Como sabemos, vivemos em um país em que a desigualdade social ainda existe e por isso há várias pessoas necessitadas, às vezes grupos de pessoas com um problema em comum. Precisamos de um sistema para apoiar essa rede de doações: o eDoe.com

<h4>
  <a href="https://docs.google.com/document/d/e/2PACX-1vST2TI5lDbtMlv8rhFYJkYnrfgqzyWDv6DDvvAajz3_KK4tAs_UnAbYdI6oeMQA6jEHo5HwUAatHmd8/pub">eDoe Documentação</a>
</h4>

<h4>
  Instalação/Execução
</h4>

Instale o MongoDB

clone o projeto: `git clone https://github.com/joaolgm/eDoe.git`

Abra o projeto em alguma IDE

digite `yarn eDoe` para executar a aplicação

requisições são feitas em: http://localhost:4444/

<h4>
  <a href="https://documenter.getpostman.com/view/4908896/SVfRsn2M?version=latest&fbclid=IwAR1tJNO4vDDTmAAe3c6LMkTsHYphsdLvD12vG53fn3q2A7Z8tiP8I-klOiY">
    Endpoints
  </a>
  
</h4>

<h4>
  Arquitetura
</h4>

<p align="center">
  <img src="https://raw.githubusercontent.com/joaolgm/eDoe/master/eDoe.png">
</p>

<h4>
  Persistência
</h4>

Para a persistência de dados, usamos o MongoDB, um banco de dados não relacional de alto desempenho para que possamos atender volumes absurdos de requisições.

<h4>
  Autenticação
</h4>

Para autenticação foi usado o JSON Web Token (jwt) e para implementação do mesmo se faz necessário um mecanismo de geração e validação de tokens, por meio de bibliotecas existentes.
 Após o usuário logar, é gerado um token, que vai ser usado para requisições futuras, logo, sem esse token, determinadas rotas são inacessíveis para o mesmo.


<p align="center">
  <img src="https://raw.githubusercontent.com/joaolgm/eDoe/master/jwt.png">
</p>
<h4>
  Desempenho
</h4>

Para o desempenho, foi utilizada a técnica de caching para melhorar a performance das requisições do tipo GET de nossos serviços.
