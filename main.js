/*
* Objetivo: Criar uma API para disponibilizar dados dos alunos da lion school
* Autor: Claudio Sousa
* Data: 27/03/2023
* Versão: 1.0
*/

//Import das dependencias do projeto
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//import da lista dos alunos
const listAlunos = require('./jsons/alunos.js');
const listCursos = require('./jsons/cursos.js');

//import das funções
const func = require('./index.js');
const { response } = require('express');
const { request } = require('http');


const app = express();

app.use((request, response, next) => {
    //Define se a API será publica ou privada
    response.header('Access-Control-Allow-Origin', '*');

    //Controlar os metodos
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    //envia para o cors() as regras de permissões
    app.use(cors());

    next();

});

//EndPoints

app.get('/v1/lion-school/cursos', cors(), async (request,response,next) => {
    let cursos = func.getCursos(listCursos.cursos);

    if(cursos){
        response.status(200);
        response.json(cursos);
    }else{
        response.status(500);
        
    }
});

app.get('/v1/lion-school/alunos', cors(), async (request, response, next) => {
    let alunos = func.getAlunos(listAlunos.alunos);

    if(alunos){
        response.status(200);
        response.json(alunos);
    }else{
        response.status(500);
    }
});

app.get('/v1/lion-school/alunos/:matricula', cors(), async(request, response, next) => {
    let matricula = request.params.matricula;
    let statusCode;
    let dadosCode = {};

    if(matricula == '' || matricula == undefined || isNaN(matricula)){
        statusCode = 400;
        dadosCode.message = 'Matrícula inválida';
    }else{
        let aluno = func.getAlunosMatricula(matricula, listAlunos.alunos);

        if(aluno){
            statusCode = 200;
            dadosCode = aluno;
        }else{
            statusCode = 404;
            dadosCode.message = 'Matrícula inválida';
        }

    }

    response.status(statusCode);
    response.json(dadosCode);
    
})

app.get('/v1/lion-school/curso', cors(), async (request,response, next) => {
    let curso = request.query.curso;
    let statusCode;
    let dadosCode = {};

    if(curso == '' || curso == undefined || !isNaN(curso) ){
        statusCode = 400;
        dadosCode.message = 'Curso inválida';
    }else{
        let alunos = func.getAlunosCurso(curso, listAlunos.alunos);

        if(alunos){
            statusCode = 200;
            dadosCode = alunos;
        }else{
            statusCode = 404;
            dadosCode.message = 'Curso inválida';
        }
    }

    response.status(statusCode);
    response.json(dadosCode);
});

app.get('/v1/lion-school/status', cors(), async(request, response, next) => {
    let status = request.query.status;
    let statusCode;
    let dadosCode = {};

    if(status == '' || status == undefined ||!isNaN(status) ){
        statusCode = 400;
        dadosCode.message = 'Curso inválida';
    }else{
        let alunos = func.getAlunosStatus(status, listAlunos.alunos);
        if(alunos){
            statusCode = 200;
            dadosCode = alunos;
        }else{
            statusCode = 404;
            dadosCode.message = 'Curso inválida';
        }
    }
    
    response.status(statusCode);
    response.json(dadosCode);

})


app.listen(8080, () => {
    console.log('Servidor rodando!');
    
})