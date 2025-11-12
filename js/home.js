document.addEventListener("DOMContentLoaded", () => {
  console.log("Página Home carregada com sucesso!");

  
  const tabelaAlunos = document.getElementById("tabelaDados");
  const tabelaCursos = document.getElementById("tabelaCursos");
  const tabelaTurmas = document.getElementById("tabelaTurmas");
  const filtroCurso = document.getElementById("filtroCurso");

  function atualizarFiltroCursos() {
    const cursosPadrao = [
      { nome: "Informática" },
      { nome: "Administração" },
      { nome: "Enfermagem" }
    ];

    const cursosExtras = getDados("cursos") || [];
    const nomesUnicos = new Set([
      ...cursosPadrao.map(c => c.nome),
      ...cursosExtras.map(c => c.nome)
    ]);

    filtroCurso.innerHTML = `<option value="">Todos</option>`;
    nomesUnicos.forEach(nome => {
      const option = document.createElement("option");
      option.value = nome;
      option.textContent = nome;
      filtroCurso.appendChild(option);
    });
  }

  function listarAlunos(filtro = "") {
    const alunos = getDados("alunos_cadastrados") || [];
    tabelaAlunos.innerHTML = "";

    if (alunos.length === 0) {
      tabelaAlunos.innerHTML = "<tr><td colspan='7'>Nenhum aluno cadastrado.</td></tr>";
      return;
    }

    const alunosFiltrados = filtro
      ? alunos.filter(a => a.curso === filtro)
      : alunos;

    if (alunosFiltrados.length === 0) {
      tabelaAlunos.innerHTML = "<tr><td colspan='7'>Nenhum aluno encontrado nesse curso.</td></tr>";
      return;
    }

    alunosFiltrados.forEach(aluno => {
      const notaTexto =
        aluno.nota === null || aluno.nota === undefined || aluno.nota === ""
          ? "-"
          : Number(aluno.nota).toFixed(1);

      let cor = "inherit";
      if (!isNaN(aluno.nota)) {
        const valor = Number(aluno.nota);
        if (valor >= 7) cor = "green";
        else if (valor >= 5) cor = "red";
      }

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${aluno.nome}</td>
        <td>${aluno.idade}</td>
        <td>${aluno.matricula}</td>
        <td>${aluno.curso}</td>
        <td>${aluno.turma}</td>
        <td style="text-align:center; font-weight:bold; color:${cor};">${notaTexto}</td>
        <td style="text-align:center;">
          <button class="btn-remover" onclick="excluirAluno('${aluno.cpf}')">✖️</button>
        </td>
      `;
      tr.querySelector("td:nth-child(6)").addEventListener("click", () => editarMediaAluno(aluno.cpf));

      tabelaAlunos.appendChild(tr);
    });
  }

  function listarCursos() {
    const cursos = getDados("cursos") || [];
    tabelaCursos.innerHTML = "";

    if (cursos.length === 0) {
      tabelaCursos.innerHTML = "<tr><td colspan='3'>Nenhum curso cadastrado.</td></tr>";
      return;
    }

    cursos.forEach(curso => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${curso.nome}</td>
        <td>${curso.descricao}</td>
        <td>${curso.anoInicio}</td>
      `;
      tabelaCursos.appendChild(tr);
    });
  }


  function listarTurmas() {
    const turmas = getDados("turmas") || [];
    tabelaTurmas.innerHTML = "";

    if (turmas.length === 0) {
      tabelaTurmas.innerHTML = "<tr><td colspan='5'>Nenhuma turma cadastrada.</td></tr>";
      return;
    }

    turmas.forEach(turma => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${turma.nome}</td>
        <td>${turma.curso}</td>
        <td>${turma.anoInicio}</td>
        <td>${turma.anoFinal}</td>
        <td style="text-align:center;">${turma.quantidadeAlunos || 0}</td>
      `;
      tabelaTurmas.appendChild(tr);
    });
  }

  function editarMediaAluno(cpf) {
    const alunos = getDados("alunos_cadastrados") || [];
    const index = alunos.findIndex(a => a.cpf === cpf);
    if (index === -1) return alert("Aluno não encontrado.");

    const aluno = alunos[index];
    const atual = aluno.nota ?? "";
    const novaNota = prompt(`Digite a nova média para ${aluno.nome} (0 a 10):`, atual);

    if (novaNota === null) return; 

    const valor = parseFloat(novaNota.replace(",", "."));
    if (isNaN(valor) || valor < 0 || valor > 10) {
      alert("Digite um valor válido entre 0 e 10.");
      return;
    }

    alunos[index].nota = valor;
    salvarDados("alunos_cadastrados", alunos);
    alert(`Média de ${aluno.nome} atualizada para ${valor.toFixed(1)}.`);
    listarAlunos(filtroCurso.value);
  }

  window.excluirAluno = function(cpf) {
    const alunos = getDados("alunos_cadastrados") || [];
    const index = alunos.findIndex(a => a.cpf === cpf);

    if (index === -1) {
      alert("Aluno não encontrado.");
      return;
    }

    const confirmar = confirm(`Tem certeza que deseja excluir o aluno ${alunos[index].nome}?`);
    if (!confirmar) return;

    alunos.splice(index, 1);
    salvarDados("alunos_cadastrados", alunos);

    alert("Aluno excluído com sucesso!");
    listarAlunos(filtroCurso.value);
  };

  // Eventos
  filtroCurso.addEventListener("change", e => listarAlunos(e.target.value));

  // Inicialização
  atualizarFiltroCursos();
  listarAlunos();
  listarCursos();
  listarTurmas();
});