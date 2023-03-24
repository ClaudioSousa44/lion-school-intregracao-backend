//importando jsons
const cursos = require('./jsons/cursos.js');
const alunos = require('./jsons/alunos.js');

//Função para retornar o json com informações dos cursos
const getCursos = (listaCursos) => {
    const cursosJson = {};
    const cursosArray = [];
    let status = false;

    listaCursos.forEach(curso => {
        const opcoesCursos = {};
        opcoesCursos.sigla = curso.sigla;
        opcoesCursos.icone = curso.icone;
        cursosArray.push(opcoesCursos);
        status = true;
    });

    if (status){
        cursosJson.cursos = cursosArray
        return cursosJson;
    }else{
        return status;
    }
    
}

// console.log(getCursos(cursos.cursos))

//Função para retornar o json com todos os alunos
const getAlunos = (listaAlunos) => {
    const alunosJson = {};
    const alunosArray = [];
    let status = false;

    listaAlunos.forEach(aluno => {
        let alunoInfo = {};
        alunoInfo.foto = aluno.foto;
        alunoInfo.nome = aluno.nome;
        alunoInfo.matricula = aluno.matricula;
        alunoInfo.sexo = aluno.sexo;
        alunoInfo.status = aluno.status;

        alunosArray.push(alunoInfo);
        status = true
    })

    if (status){
        alunosJson.alunos = alunosArray
        return alunosJson
    }else{
        return status;    
    }
   
  
    
}

// console.log(getAlunos(alunos.alunos));

//Função para retornar o json com todos os alunos filtrando pela matricula
const getAlunosMatricula = (numeroMatricula,listaAlunos) => {
    const alunosJson = {};
    let status = false;

    listaAlunos.forEach(aluno => {
        if(aluno.matricula == numeroMatricula){
            alunosJson.aluno = aluno
            status = true;
        }
        
    })

    if (status){
        return alunosJson
    }else{
        return status;    
    }
  
}

// console.log(getAlunosMatricula("20151001001", alunos.alunos));

//Função para retornar o json comt todos os alunos de acordo com o curso
const getAlunosCurso = (curso, listaAlunos) => {
    const alunoJson = {};
    const alunosArray = [];
    let status = false;
 
    listaAlunos.forEach(aluno => {
        if(aluno.curso.sigla == curso.toUpperCase){
            alunosArray.push(aluno);
            status = true;
        }
      

    })
    alunoJson.aluno = alunosArray
    return alunoJson
}

console.log(getAlunosCurso("RDS", alunos.alunos));