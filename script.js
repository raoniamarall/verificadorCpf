function formatar(mascara, documento) {
  let i = documento.value.length;
  const saida = mascara.substring(0, 1);
  const texto = mascara.substring(i);
  if (texto.substring(0, 1) !== saida) {
    documento.value += texto.substring(0, 1);
  }
}

const cpfsList = JSON.parse(localStorage.getItem("cpfs")) || [];
const cpf = document.querySelector("#cpf");

cpf.addEventListener("change", () => {
  const novoCpf = cpf.value;

  if (cpfsList.includes(novoCpf)) {
    alert("CPF já cadastrado");
  } else {
    cpfsList.push(novoCpf);
    localStorage.setItem("cpfs", JSON.stringify(cpfsList));
    alert("CPF cadastrado com sucesso!");
  }
});
