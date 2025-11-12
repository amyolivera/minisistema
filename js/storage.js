
function getDados(key = "alunos_cadastrados") {
  try {
    const dados = JSON.parse(localStorage.getItem(key)) || [];
    return Array.isArray(dados) ? dados : [];
  } catch (erro) {
    console.error(`Erro ao carregar dados (${key}):`, erro);
    return [];
  }
}


function salvarDados(key = "alunos_cadastrados", dados = []) {
  try {
    localStorage.setItem(key, JSON.stringify(dados));
  } catch (erro) {
    console.error(`Erro ao salvar dados (${key}):`, erro);
    alert("Erro ao salvar dados. Verifique o espaço disponível no navegador.");
  }
}


function limparDados(key = "alunos_cadastrados") {
  try {
    localStorage.removeItem(key);
    alert(`Todos os registros de "${key}" foram removidos!`);
  } catch (erro) {
    console.error(`Erro ao limpar dados (${key}):`, erro);
  }
}


function gerarMatricula() {
  try {
    const dados = getDados("alunos_cadastrados");
    if (dados.length === 0) return 10000;
    const ultima = dados[dados.length - 1].matricula;
    return ultima + 1;
  } catch (erro) {
    console.error("Erro ao gerar matrícula:", erro);
    return Math.floor(10000 + Math.random() * 90000);
  }
}


function adicionarItem(key, item, campoUnico = "nome") {
  const dados = getDados(key);
  const existe = dados.some((d) => d[campoUnico] === item[campoUnico]);

  if (existe) {
    alert(`Já existe um registro com o mesmo ${campoUnico}!`);
    return false;
  }

  dados.push(item);
  salvarDados(key, dados);
  return true;
}


function atualizarItem(key, campoUnico, valorCampo, campoAtualizar, novoValor) {
  const dados = getDados(key);
  const index = dados.findIndex((d) => d[campoUnico] === valorCampo);

  if (index === -1) return false;

  dados[index][campoAtualizar] = novoValor;
  salvarDados(key, dados);
  return true;
}

function contarItens(key) {
  const dados = getDados(key);
  return dados.length;
}