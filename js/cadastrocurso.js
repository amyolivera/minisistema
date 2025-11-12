document.addEventListener("DOMContentLoaded", () => {
  const formCadastroCurso = document.getElementById("formCadastroCurso");
  const tabelaCurso = document.getElementById("tabelaCurso");

  function atualizarTabela() {
    const cursos = getDados("cursos");
    tabelaCurso.innerHTML = "";

    if (cursos.length === 0) {
      tabelaCurso.innerHTML = "<tr><td colspan='3'>Nenhum curso cadastrado</td></tr>";
      return;
    }

    cursos.forEach((curso) => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${curso.nome}</td>
        <td>${curso.descricao}</td>
        <td>${curso.anoInicio}</td>
      `;
      tabelaCurso.appendChild(linha);
    });
  }

  atualizarTabela();

  formCadastroCurso.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nomeCurso").value.trim();
    const descricao = document.getElementById("descricaoCurso").value.trim();
    const anoInicio = document.getElementById("anoInicio").value.trim();

    if (!nome || !descricao || !anoInicio) {
      alert("Preencha todos os campos!");
      return;
    }

    const cursos = getDados("cursos");
    const novoCurso = { nome, descricao, anoInicio };
    cursos.push(novoCurso);
    salvarDados("cursos", cursos);

    alert("Curso cadastrado com sucesso!");
    formCadastroCurso.reset();
    atualizarTabela();
  });
});