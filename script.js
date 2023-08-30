//formata cpf ou cpj
function formatar(input) {
  let valor = input.value;
  valor = valor.replace(/\D/g, "");
  if (valor.length > 11) {
    valor = valor.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
  } else {
    valor = valor.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  }
  input.value = valor;
}

const infoInput = document.getElementById("info");

// Função para validar CPF
function validaCPF(cpf) {
  if (cpf.length != 11) {
    return false;
  } else {
    let numeros = cpf.substring(0, 9);
    let digitos = cpf.substring(9);
    let soma = 0;
    for (let i = 10; i > 1; i--) {
      soma += numeros.charAt(10 - i) * i;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    // Validação do primeiro dígito
    if (resultado != digitos.charAt(0)) {
      return false;
    }
    soma = 0;
    numeros = cpf.substring(0, 10);
    for (let k = 11; k > 1; k--) {
      soma += numeros.charAt(11 - k) * k;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    // Validação do segundo dígito
    if (resultado != digitos.charAt(1)) {
      return false;
    }
    return true;
  }
}

// Função para validar CNPJ
function validaCNPJ(cnpj) {
  if (cnpj.length != 14) {
    return false;
  } else {
    let numeros = cnpj.substring(0, 12);
    let digitos = cnpj.substring(12);
    let soma = 0;
    let pos = 5;
    for (let i = 0; i < 12; i++) {
      soma += numeros.charAt(i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    // Validação do primeiro dígito
    if (resultado != digitos.charAt(0)) {
      return false;
    }
    soma = 0;
    numeros = cnpj.substring(0, 13);
    pos = 6;
    for (let k = 0; k < 13; k++) {
      soma += numeros.charAt(k) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    // Validação do segundo dígito
    if (resultado != digitos.charAt(1)) {
      return false;
    }
    return true;
  }
}

// Função para aplicar validaçao no  CPF ou CNPJ
function validar() {
  const documentoValue = infoInput.value.replace(/\D/g, ""); // Remove não dígitos

  if (validaCPF(documentoValue)) {
    alert("CPF válido.");
  } else if (validaCNPJ(documentoValue)) {
    alert("CNPJ válido.");
  } else {
    alert("CPF/CNPJ inválido.");
  }
}

// Função para salvar os dados no localStorage
function salvar() {
  const dados = document.getElementById("info");
  localStorage.setItem("info", dados.value);
  alert("Dados salvos com sucesso!");
}
