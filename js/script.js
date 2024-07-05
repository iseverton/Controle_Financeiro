const btnAdd = document.querySelector("#btn-add");
const entradasDisplay = document.querySelector("#entradasDisplay");
const saidaDisplay = document.querySelector("#saidaDisplay");
const saldoDisplay = document.querySelector("#saldoDisplay");
const lista = document.querySelector("#lista");
const avisoGrafico = document.querySelector(".grafico-p");
let selecionado;

let informacoes = [];
let entrada = 0;
let saida = 0;
let saldo = 0;
let myGrafico;

// Selecionar radio
function selecionarRadio() {
  const entradaopcao = document.querySelector("#entradaopcao");
  const saidaOpcao = document.querySelector("#saidaOpacao");
  if (entradaopcao.checked) {
    selecionado = "entrada";
  } else {
    selecionado = "saida";
  }
}

// atuazir os valores de entradas/saidas/saldo
function atualizarDados() {
  document.querySelector("#descricao").value = "";
  document.querySelector("#valor").value = "";
  document.querySelector("#entradaopcao").checked = false;
  document.querySelector("#saidaOpacao").checked = false;

  entrada = 0;
  saida = 0;
  saldo = 0;
  informacoes.forEach((transacao) => {
    if (transacao.tipo === "entrada") {
      entrada += transacao.valor;
      entradasDisplay.style.color = "green";
    } else {
      saida += transacao.valor;
      saidaDisplay.style.color = "red";
    }
  });

  saldo = entrada - saida;

  entradasDisplay.textContent = `R$: ${entrada.toFixed(2)}`;
  saidaDisplay.textContent = `R$: ${saida.toFixed(2)}`;
  saldoDisplay.textContent = `R$: ${saldo.toFixed(2)}`;
}

function criarGrafico() {
  const grafico = document.querySelector("#grafico");

  if (myGrafico) {
    myGrafico.destroy();
  }

  avisoGrafico.style.display = "none";

  myGrafico = new Chart(grafico, {
    type: "bar",
    data: {
      labels: ["entrada", "saida"],
      datasets: [
        {
          label: "Valores",
          data: [entrada, saida],
          borderWidth: 1,
          backgroundColor: ["rgb(0, 255, 0)", "rgb(255, 0, 0)"],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function criarTabela() {
  let tabela = document.querySelector("#tabelaTransacoes");
  let elements = "";

  informacoes.map((record) => {
    const tipoClass = record.tipo === "entrada" ? "entrada-text" : "saida-text";
    elements += `<tr>
            <td>${record.descricao}</td>
            <td>${record.valor.toFixed(2)}</td>
            <td class="${tipoClass}">${record.tipo}</td>
            <td>
                   <button onClick="deletar('${
                     record.descricao
                   }')">Delete</button>
            </td>
        </tr>`;
  });

  tabela.innerHTML = elements;
}

function deletar(descricao) {
  const confirmarDeletar = confirm(
    "voce tem certeza que deseja deletar esta transação?"
  );

  if (confirmarDeletar) {
    informacoes = informacoes.filter(
      (record) => record.descricao !== descricao
    );
  }

  atualizarDados();
  criarTabela();
  criarGrafico();
}

btnAdd.addEventListener("click", (event) => {
  event.preventDefault();

  const descricao = document.querySelector("#descricao").value;
  const valor = parseFloat(document.querySelector("#valor").value);

  if (isNaN(valor)) {
    alert("Por favor, insira um valor numérico válido.");
    return;
  }

  selecionarRadio();

  informacoes.push({
    descricao: descricao,
    valor: valor,
    tipo: selecionado,
  });

  atualizarDados();
  criarGrafico();
  criarTabela();
});
