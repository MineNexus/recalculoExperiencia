# Recalculo Experiência
Esse código foi desenvolvido por mim (Soldado_08) para fazer o recálculo de experiência do jobs do servidor MineNexus com base na nova curva de experiência.

## Como executar o código
Caso você queira testar o código, basta seguir os seguintes passos:

### Instalar o git na sua máquina
Caso você ainda não tenha git instalado, você pode baixá-lo aqui https://git-scm.com/downloads

### Clonar o repositório
Vá até a pasta que você quer e execute o seguinte comando no terminal:
```
git clone https://github.com/MineNexus/recalculoExperiencia.git
```

### Instalar dependência
Abra o terminal e execute o seguinte comando
```
npm install
```
Isso instalará todas as dependência necessárias para rodar o cálculo. (Somente uma)

### Adicionar dados
Você precisa adicionar os dados do jobs no arquivo JOBS_DB.csv.
Já possui um template dentro do arquivo, basta replicá-lo para quantos usuários você quiser testar.
Atenção: Não remova a primeira linha, já que ela define o nome das colunas
Exemplo:
```
ID,NIVEL,TRABALHO,EXPERIENCIA,ARCHIVE
//ID: O id do usuário, não importa para o cálculo
//NIVEL: O nivel que o usuário estava antes do calculo
//TRABALHO: O nome do trabalho, não importa para o cálculo
//EXPERIENCIA: A experiência que o usuário possui no nível dele
//ARCHIVE: 1 ou 0, só define em qual tabela os dados serão inseridos, não importa para o cálculo
```

### Adicionar a curva de experiência
Você deve inserir dentro do código a equação da curva de experiência. Tanto a antiga quanto a nova.
Modifique as seguintes duas funções:
```
const calculoXpNovo = jobLevel => 0; //Calculo novo da curva de experiência
const calculoXpAntigo = jobLevel => 0; //Calculo antigo da curva de experiência
```
Exemplo:
```
const calculoXpNovo = jobLevel => jobLevel*100 + 200; //Calculo novo da curva de experiência
const calculoXpAntigo = jobLevel => jobLevel*1000 + 100; //Calculo antigo da curva de experiência
```

### Executar o código
Abra um terminal na pasta do repositório e execute o seguinte comando
```
node index.js
```
Será gerado um arquivo chamado script.sql contendo todos os comandos SQL necessários para executar a alteração no banco de dados.
Além disso, será gerado um arquivo chamado comparacao.txt, mostrando a relação entre todos os níveis antigos e novos para os usuários


Caso eu tenha esquecido de documentar algo ou caso você tenha alguma sugestão, me contate pelo discord
Discord: https://discord.gg/RJu4xng
Site: https://minenexus.net/
