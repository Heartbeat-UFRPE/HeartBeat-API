const db = require('mysql');
const popularDataBase = require('./src/popularDB');
//Dados da conexão
const connection = db.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: ''
});
//Criação da tabela do cadastro
const creationdb = `create database if not exists db;`; 
const usingdb = `use db`;
const createTableUser = `CREATE TABLE if not exists Users (
    id int not null auto_increment,
    name varchar(100) not null,
    email varchar(50) not null,
    birth date not null,
    sex enum('F','M') not null,
    password varchar(15) not null,
    primary key(id)
)`;
//Criação da tabela da Anamnese
const createTableAnamnesia = `CREATE TABLE IF NOT EXISTS Anamnesia ( 
    id int not null auto_increment,
    userID int not null,
    height int,
    weight float,
    conditions enum('0', '1'),
    familiarHistory enum('0', '1'),
    stress enum ('0','1'),
    qualitySleep enum ('0','1'),
    qualityFood enum ('0', '1'),
    PRIMARY KEY(id),
    FOREIGN KEY (userID) REFERENCES Users(id)
)`

const createTablePressure = `CREATE TABLE IF NOT EXISTS Pressure(
    id int not null auto_increment,
    userID int not null,
    weekday enum('0','1','2','3','4','5','6'),
    value varchar(7) not null,

    PRIMARY KEY(id),
    FOREIGN KEY(userID) references Users(id)
)`

const createTableWeight = `CREATE TABLE IF NOT EXISTS Weight(
    id int not null auto_increment,
    userID int not null,
    weekday enum('0','1','2','3','4','5','6'),
    value float not null,

    PRIMARY KEY(id),
    FOREIGN KEY(userID) references Users(id)
)`

connection.connect(function(err){ //Erro de conexão
    if(err) return console.log(err);
    
    connection.query(creationdb,(err, result)=> {//Erro de criação do DB
        if(err) throw err;
    });

    connection.query(usingdb,(err, result)=> {//Erro de uso do BD
        if(err) throw err;
    });

    connection.query(createTableUser,(err, result)=> {//Erro de criação da tabela usuário 
        if(err) throw err;
    });

    connection.query(createTableAnamnesia,(err, result)=> {//Erro criação da tabela Anamnese
        if(err) throw err;
    });

    connection.query(createTablePressure, (err, result) => {
        if(err) throw err;
    });

    connection.query(createTableWeight, (err, result) => {
        if(err) throw err;
    });

    connection.query('SELECT * from Users', (err, res) => { //Erro de tamanho zero
        if (res.length == 0){
            connection.query(popularDataBase,(err, result)=> {
                if(err) throw err;
            }
        )};
    });
});

module.exports ={connection}
