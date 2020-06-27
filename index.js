//20 é o cara

const csv = require('csvtojson')
const fs = require('fs');

const path = 'JOBS_DB.csv'

const calculoXpNovo = jobLevel => 0; //Calculo novo da curva de experiência
const calculoXpAntigo = jobLevel => 0; //Calculo antigo da curva de experiência

const recalculoExp = data => {
    const { userid, trabalho, expTotal, archive } = data;
    let exp = expTotal;
    let novoNivel = 1;
    while (exp >= calculoXpNovo(novoNivel)) {
        exp -= calculoXpNovo(novoNivel);
        novoNivel++;
    }
    return {
        userid,
        trabalho,
        nivel: novoNivel,
        exp,
        archive
    }
}

const gerarScriptSql = data => {
    const {userid, trabalho, nivel, exp, archive} = data;
    const table = archive == '1' ? 'XXXXXXX' : 'XXXXXXXX'; //Tabelas censuradas
    return `UPDATE ${table} SET level = '${nivel}', experience = '${exp}' WHERE userid = '${userid}' AND job = '${trabalho}';`;
}

const gerarComparacao = (data, dataAntiga) => {
    const {userid, trabalho, nivel} = data;
    return `[Comparação] ID: ${userid}, TRABALHO: ${trabalho}, NIVEL: ${dataAntiga.nivel}->${nivel}`;
}

const run = async () => {
    let db;
    db = await csv().fromFile(path);
    let dbAntigo = db;
    db = db.map(data => {
        return {
            userid: data.userid,
            trabalho: data.trabalho,
            expTotal: calculoXpAntigo(data.nivel) + parseFloat(data.exp),
            archive: data.archive
        }
    })
    db = db.map(data => recalculoExp(data));
    
    //Gera o script SQL
    let fileSql = fs.createWriteStream('script.sql');
    fileSql.on('error', err => console.log(err));
    db.forEach(data => {
        const sql = gerarScriptSql(data);
        fileSql.write(`${sql}\n`);
    })
    fileSql.end();

    //Salva a comparação entre os níveis novos e antigos
    let fileComparacao = fs.createWriteStream('comparacao.txt');
    fileComparacao.on('error', err => console.log(err));
    db.forEach(data => {
        const dataAntiga = dbAntigo.find(dataAntiga => dataAntiga.userid == data.userid && dataAntiga.trabalho == data.trabalho);
        const comparacao = gerarComparacao(data, dataAntiga);
        fileComparacao.write(`${comparacao}\n`);
    })
    fileComparacao.end();
}

run();