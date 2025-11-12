document.addEventListener("DOMContentLoaded", () => {
  const formLoginAluno = document.getElementById("formLoginAluno");
  const tabelaAluno = document.getElementById("tabelaAluno");

  if (formLoginAluno) {
    formLoginAluno.addEventListener("submit", (e) => {
      e.preventDefault();

      try {
        const matricula = document.getElementById("matricula").value.trim();
        const cpf = document.getElementById("cpfAluno").value.trim();

        if (!matricula || !cpf) {
          alert("Preencha todos os campos!");
          return;
        }

        const alunos = getDados("alunos_cadastrados");

        const aluno = alunos.find(
          (a) => String(a.matricula) === matricula && a.cpf === cpf
        );

        if (!aluno) {
          alert("Matrícula ou CPF incorretos!");
          return;
        }

         
        localStorage.setItem("alunoLogado", JSON.stringify(aluno));

        alert(`Bem-vindo(a), ${aluno.nome}!`);
        window.location.href = "homeAluno.html";
      } catch (erro) {
        console.error("Erro no login do aluno:", erro);
        alert("Ocorreu um erro ao tentar fazer login. Tente novamente!");
      }
    });
  }

  if (tabelaAluno) {
    try {
      const alunoLogado = JSON.parse(localStorage.getItem("alunoLogado"));
      const alunos = getDados("alunos_cadastrados");

      if (!alunoLogado) {
        alert("Nenhum aluno logado. Faça login novamente.");
        window.location.href = "loginAluno.html";
        return;
      }

      const alunoAtualizado = alunos.find(a => a.cpf === alunoLogado.cpf) || alunoLogado;

      const nota = alunoAtualizado.nota ?? "-";
      let cor = "inherit";

      if (!isNaN(nota)) {
        const valor = Number(nota);
        if (valor >= 7) cor = "green";
        else if (valor >= 5) cor = "red";
      }

     
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${alunoAtualizado.nome}</td>
        <td>${alunoAtualizado.idade}</td>
        <td>${alunoAtualizado.matricula}</td>
        <td>${alunoAtualizado.turma}</td>
        <td>${alunoAtualizado.curso}</td>
        <td style="text-align:center; font-weight:bold; color:${cor};">
          ${isNaN(nota) ? "-" : Number(nota).toFixed(1)}
        </td>
      `;

      tabelaAluno.appendChild(tr);
    } catch (erro) {
      console.error("Erro ao carregar dados do aluno logado:", erro);
      alert("Erro ao exibir os dados. Tente novamente!");
    }
  }
});