import {
    formatar,
    validaCPF,
    validaCNPJ,
    validar,
    salvar,
    exibirDocumentosSalvos,
    apagarDocumentos,
    apagarDocumento
} from './funçoes.mjs';

window.onload = function () {
    exibirDocumentosSalvos();
};

const infoInput = document.getElementById("info");

