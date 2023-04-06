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
        alunoInfo.curso = aluno.curso[0].sigla
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

// Função para pegar as iniciais
const getInitials = (nomeMateria) => {
    // const materiass = nomeMateria.split(' ');
    let materias = nomeMateria.replace(/\s(de|da|a|das)\s/g, ' ');
    materias = materias.split(' ');
    const initials = materias.map(materia => materia.charAt(0).toUpperCase());
    return initials.join('')
}
// console.log(getInitials('Banco de dados'));



//Função para retornar o json com todos os alunos filtrando pela matricula
const getAlunosMatricula = (numeroMatricula,listaAlunos) => {
    const alunosJson = {};
    let status = false;

    listaAlunos.forEach(aluno => {
        if(aluno.matricula == numeroMatricula){
            alunosJson.aluno = aluno
            aluno.curso[0].disciplinas.forEach(disciplina => {
                disciplina.sigla = getInitials(disciplina.nome)
            })
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

//Função para retornar o json com todos os alunos de acordo com o curso
const getAlunosCurso = (curso, listaAlunos) => {
    const cursoUpper = curso.toUpperCase();
    const alunoJson = {};
    const alunosArray = [];
    let status = false;

 
    listaAlunos.forEach(aluno => {
        let alunos = {};
        if(aluno.curso[0].sigla.toUpperCase() == cursoUpper){
            if(cursoUpper == "DS"){
                alunoJson.NomeCurso = "Técnico em Desenvolvimento de Sistemas"
            }else{
                alunoJson.NomeCurso = "Técnico em Redes de Computadores"
            }
            alunos = aluno
            alunosArray.push(alunos);
            status = true;
            
        }
      

    })

    if(status){
        alunoJson.aluno = alunosArray
        return alunoJson
    }else{
        return status;
    }
    
}

// console.log(getAlunosCurso("DS", alunos.alunos));

//Função para retornar o json com todos os alunos de acordo com status

const getAlunosStatus = (statusAluno, listaAlunos) => {
    const statusAlunoUpper = statusAluno.toUpperCase()
    const alunoJson = {};
    const alunosArray = [];
    let status = false;
 
    listaAlunos.forEach(aluno => {
        let alunos = {};
        if(aluno.status.toUpperCase() == statusAlunoUpper){
            alunos = aluno;
            alunosArray.push(aluno);
            status = true;
            
        }
      

    })

    alunoJson.aluno = alunosArray
    return alunoJson
}

//  console.log(getAlunosStatus("FinalizadO", alunos.alunos));
 
module.exports = {
    getCursos,
    getAlunos,
    getAlunosMatricula,
    getAlunosCurso,
    getAlunosStatus
}