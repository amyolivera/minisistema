document.addEventListener("DOMContentLoaded", () => {
  const formCadastro = document.getElementById("formCadastro");
  const tabela = document.getElementById("tabelaDados");
  const selectCurso = document.querySelector(".curso");
  const selectTurma = document.querySelector(".turma");

 // Carregar cursos (padrão + cadastrados)
  function carregarCursos() {
    const cursosPadrao = [
      { nome: "Informática" },
      { nome: "Administração" },
      { nome: "Enfermagem" }
    ];

    const cursosExtras = getDados("cursos");
    const todosCursos = [...cursosPadrao, ...cursosExtras];

    selectCurso.innerHTML = '<option value="">Selecione o Curso</option>';
    todosCursos.forEach(curso => {
      const option = document.createElement("option");
      option.value = curso.nome;
      option.textContent = curso.nome;
      selectCurso.appendChild(option);
    });
  }


  function carregarTurmas() {
    const turmas = getDados("turmas") || [];
    selectTurma.innerHTML = '<option value="">Selecione a Turma</option>';

    turmas.forEach(turma => {
      const option = document.createElement("option");
      option.value = turma.nome;
      option.textContent = `${turma.nome} (${turma.curso})`;
      selectTurma.appendChild(option);
    });
  }

  
  function listarAlunos() {
    const alunos = getDados("alunos_cadastrados") || [];
    tabela.innerHTML = "";

    if (alunos.length === 0) {
      tabela.innerHTML = "<tr><td colspan='5'>Nenhum aluno cadastrado.</td></tr>";
      return;
    }

    alunos.forEach(aluno => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${aluno.nome}</td>
        <td>${aluno.idade}</td>
        <td>${aluno.matricula}</td>
        <td>${aluno.curso}</td>
        <td>${aluno.turma}</td>
      `;
      tabela.appendChild(tr);
    });
  }

  
  formCadastro.addEventListener("submit", e => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const idade = document.getElementById("idade").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const curso = selectCurso.value.trim();
    const turma = selectTurma.value.trim();

    if (!nome || !idade || !cpf || !curso || !turma) {
      alert("Preencha todos os campos!");
      return;
    }

    const alunos = getDados("alunos_cadastrados");
    const existe = alunos.some(a => a.cpf === cpf);
    if (existe) {
      alert("Já existe um aluno com este CPF!");
      return;
    }

    const matricula = gerarMatricula();
    const novoAluno = { nome, idade: Number(idade), cpf, curso, turma, matricula };

    alunos.push(novoAluno);
    salvarDados("alunos_cadastrados", alunos);

    // Atualiza quantidade de alunos na turma correspondente
    const turmas = getDados("turmas");
    const turmaSelecionada = turmas.find(t => t.nome === turma);
    if (turmaSelecionada) {
      turmaSelecionada.quantidadeAlunos = (turmaSelecionada.quantidadeAlunos || 0) + 1;
      salvarDados("turmas", turmas);
    }

    alert(`Aluno cadastrado com sucesso!\nMatrícula: ${matricula}`);
    formCadastro.reset();
    listarAlunos();
  });

  carregarCursos();
  carregarTurmas();
  listarAlunos();
});