document.addEventListener("DOMContentLoaded", () => {
  const formCadastroTurma = document.getElementById("formCadastroTurma");
  const tabelaTurmas = document.getElementById("tabelaTurmas");
  const selectCurso = document.getElementById("cursoTurma");

 
  function atualizarSelectCurso() {
    const cursos = getDados("cursos") || [];
    selectCurso.innerHTML = '<option value="">Selecione o curso</option>';

    if (cursos.length === 0) {
      const opt = document.createElement("option");
      opt.textContent = "Nenhum curso cadastrado";
      opt.disabled = true;
      selectCurso.appendChild(opt);
      return;
    }

    cursos.forEach(curso => {
      const option = document.createElement("option");
      option.value = curso.nome;
      option.textContent = curso.nome;
      selectCurso.appendChild(option);
    });
  }


  function atualizarTabelaTurmas() {
    const turmas = getDados("turmas") || [];
    tabelaTurmas.innerHTML = "";

    if (turmas.length === 0) {
      tabelaTurmas.innerHTML = "<tr><td colspan='4'>Nenhuma turma cadastrada</td></tr>";
      return;
    }

    turmas.forEach(turma => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${turma.nome}</td>
        <td>${turma.anoInicio}</td>
        <td>${turma.anoFinal}</td>
        <td>${turma.curso}</td>
      `;
      tabelaTurmas.appendChild(linha);
    });
  }

  formCadastroTurma.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nomeTurma").value.trim();
    const anoInicio = document.getElementById("anoInicioTurma").value.trim();
    const anoFinal = document.getElementById("anoFinalTurma").value.trim();
    const curso = selectCurso.value.trim();

    if (!nome || !anoInicio || !anoFinal || !curso) {
      alert("Preencha todos os campos!");
      return;
    }

    const turmas = getDados("turmas");
    const novaTurma = {
      nome,
      anoInicio,
      anoFinal,
      curso,
      quantidadeAlunos: 0 // começa com zero alunos
    };

    turmas.push(novaTurma);
    salvarDados("turmas", turmas);

    alert("Turma cadastrada com sucesso!");
    formCadastroTurma.reset();
    atualizarTabelaTurmas();
  });

  // Inicialização
  atualizarSelectCurso();
  atualizarTabelaTurmas();
});