function formatar(mascara, documento) {
  let i = documento.value.length;
  const saida = mascara.substring(0, 1);
  const texto = mascara.substring(i);
  if (texto.substring(0, 1) !== saida) {
    documento.value += texto.substring(0, 1);
  }
}

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let primeiroDigito = 11 - (soma % 11);
  if (primeiroDigito >= 10) {
    primeiroDigito = 0;
  }

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let segundoDigito = 11 - (soma % 11);
  if (segundoDigito >= 10) {
    segundoDigito = 0;
  }

  if (
    primeiroDigito === parseInt(cpf.charAt(9)) &&
    segundoDigito === parseInt(cpf.charAt(10))
  ) {
    return true;
  } else {
    return false;
  }
}

const cpfsList = JSON.parse(localStorage.getItem("cpfs")) || [];
const cpfInput = document.querySelector("#cpf");
const listaCpfs = document.getElementById("listaCpfs"); // Referência à lista de CPFs

cpfInput.addEventListener("input", () => {
  formatar("###.###.###-##", cpfInput);

  const novoCpf = cpfInput.value;

  if (!validarCPF(novoCpf)) {
    cpfInput.setCustomValidity("CPF inválido");
  } else {
    cpfInput.setCustomValidity("");
  }
});

cpfInput.addEventListener("blur", () => {
  const novoCpf = cpfInput.value;

  if (!validarCPF(novoCpf)) {
    alert("CPF inválido");
    cpfInput.value = "";
  } else if (cpfsList.includes(novoCpf)) {
    alert("CPF já cadastrado");
    cpfInput.value = "";
  } else {
    cpfsList.push(novoCpf);
    localStorage.setItem("cpfs", JSON.stringify(cpfsList));
    alert("CPF cadastrado com sucesso!");
  }
});

// Função para formatar CPF para exibição
function formatarCpf(cpf) {
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Preencher a lista de CPFs salvos no localStorage
cpfsList.forEach((cpf) => {
  const li = document.createElement("li");
  li.textContent = formatarCpf(cpf);
  listaCpfs.appendChild(li);
});

// excluir cpf ao clicar no botao
function excluirCpf(cpf) {
  const cpfIndex = cpfsList.indexOf(cpf);
  cpfsList.splice(cpfIndex, 1);
  localStorage.setItem("cpfs", JSON.stringify(cpfsList));

  listaCpfs.innerHTML = "";
  cpfsList.forEach((cpf) => {
    const li = document.createElement("li");
    li.textContent = formatarCpf(cpf);
    listaCpfs.appendChild(li);
  });
}
