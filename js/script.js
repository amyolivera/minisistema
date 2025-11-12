document.addEventListener("DOMContentLoaded", () => {
  const formCadastroAdmin = document.getElementById("formCadastroAdmin");
  const formLoginAdmin = document.getElementById("formLoginAdmin");

  if (formCadastroAdmin) {
    formCadastroAdmin.addEventListener("submit", (e) => {
      e.preventDefault();

      try {
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const cpf = document.getElementById("cpf").value.trim();

        if (!nome || !email || !cpf) {
          alert("Preencha todos os campos!");
          return;
        }

        const admins = JSON.parse(localStorage.getItem("admin")) || [];

        const existe = admins.some((a) => a.email === email);
        if (existe) {
          alert("Já existe um administrador com este e-mail!");
          return;
        }

        admins.push({ nome, email, cpf });
        localStorage.setItem("admin", JSON.stringify(admins));

        alert("Admin cadastrado com sucesso!");
        formCadastroAdmin.reset();

        // Redireciona para login
        setTimeout(() => {
          window.location.href = "login.html";
        }, 800);
      } catch (erro) {
        console.error("Erro ao cadastrar admin:", erro);
        alert("Erro ao salvar o cadastro. Tente novamente!");
      }
    });
  }


  //login 
 
  if (formLoginAdmin) {
    formLoginAdmin.addEventListener("submit", (e) => {
      e.preventDefault();

      try {
        const usuario = document.getElementById("usuario").value.trim(); // email
        const senha = document.getElementById("senha").value.trim(); // cpf

        if (!usuario || !senha) {
          alert("Preencha todos os campos!");
          return;
        }

        const admins = JSON.parse(localStorage.getItem("admin")) || [];

        const valido = admins.find(
          (a) => a.email === usuario && a.cpf === senha
        );

        if (!valido) {
          alert("E-mail ou CPF incorretos!");
          return;
        }

        alert(`Bem-vindo(a), ${valido.nome}!`);
        window.location.href = "home.html";
      } catch (erro) {
        console.error("Erro no login:", erro);
        alert("Ocorreu um erro ao tentar logar. Tente novamente!");
      }
    });
  }
});