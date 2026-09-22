// Funcoes de calculo do aplicativo.
// Todas usam o objeto Math do JavaScript.

// Sorteia um item qualquer de uma lista.
export function sortearItem(lista) {
  const posicao = Math.floor(Math.random() * lista.length);
  return lista[posicao];
}

// Sorteia a confianca do reconhecimento, entre 94.0% e 99.5%.
// O resultado tem uma casa decimal, no mesmo formato que o prototipo
// da Sprint 2 ja mostrava na tela ("98.4% conf.").
export function sortearConfianca() {
  const valor = 94 + Math.random() * 5.5;
  return Math.round(valor * 10) / 10;
}

// Conta as palavras do texto e estima o tempo de leitura em voz alta.
// Consideramos 150 palavras por minuto.
export function estimarTempoDeLeitura(texto) {
  const palavras = texto.split(" ").length;
  return Math.ceil(palavras / 150);
}

// Estima o tamanho do arquivo PDF em KB.
// A conta comeca em 120 KB, que e o peso da imagem da pagina, e soma
// um pouco por letra reconhecida. Uma pagina cheia fica perto dos
// 142 KB que apareciam no prototipo da Sprint 2.
export function estimarTamanhoDoPdf(texto) {
  return 120 + Math.round(texto.length / 8);
}

// Impede que a velocidade da leitura saia do intervalo de 0.5x ate 2x.
export function limitarVelocidade(valor) {
  return Math.min(2, Math.max(0.5, valor));
}

// Impede que o volume saia do intervalo de 0% ate 100%.
export function limitarVolume(valor) {
  return Math.min(100, Math.max(0, Math.round(valor)));
}

// Calcula a media de confianca dos itens que estao salvos.
export function calcularMediaDeConfianca(lista) {
  if (lista.length === 0) {
    return 0;
  }
  let soma = 0;
  for (let i = 0; i < lista.length; i++) {
    soma = soma + lista[i].confianca;
  }
  return Math.round(soma / lista.length);
}

// Gera um codigo de identificacao para o documento digitalizado.
export function gerarCodigo() {
  const numero = Math.floor(Math.random() * 9000) + 1000;
  return "DOC-" + numero;
}

// Coloca um zero na frente enquanto o numero nao tiver o tamanho pedido.
function comZeros(numero, tamanho) {
  return String(numero).padStart(tamanho, "0");
}

// Monta a data e a hora do momento em que o item foi salvo.
export function dataDeAgora() {
  const agora = new Date();
  const dia = comZeros(agora.getDate(), 2);
  const mes = comZeros(agora.getMonth() + 1, 2);
  const hora = comZeros(agora.getHours(), 2);
  const minuto = comZeros(agora.getMinutes(), 2);
  return dia + "/" + mes + " as " + hora + ":" + minuto;
}

// Monta o nome do arquivo da foto, no formato que a camera do JOVI usa:
// JOVI_20260823_0941_001.jpg  (mesmo padrao do prototipo da Sprint 2)
export function nomeDaFoto(contador) {
  const agora = new Date();
  const data =
    agora.getFullYear() + comZeros(agora.getMonth() + 1, 2) + comZeros(agora.getDate(), 2);
  const hora = comZeros(agora.getHours(), 2) + comZeros(agora.getMinutes(), 2);
  return "JOVI_" + data + "_" + hora + "_" + comZeros(contador, 3) + ".jpg";
}

// Monta o nome do arquivo de texto salvo a partir da lousa:
// Lousa_23082026.txt  (mesmo padrao do prototipo da Sprint 2)
export function nomeDaLousa() {
  const agora = new Date();
  return (
    "Lousa_" +
    comZeros(agora.getDate(), 2) +
    comZeros(agora.getMonth() + 1, 2) +
    agora.getFullYear() +
    ".txt"
  );
}

// Monta a hora atual para o relogio da barra de status: 09:41
export function horaDeAgora() {
  const agora = new Date();
  return comZeros(agora.getHours(), 2) + ":" + comZeros(agora.getMinutes(), 2);
}

// Monta a saudacao de acordo com a hora do dia.
export function saudacaoDoDia() {
  const hora = new Date().getHours();
  if (hora < 12) {
    return "Bom dia";
  }
  if (hora < 18) {
    return "Boa tarde";
  }
  return "Boa noite";
}

// Deixa cada palavra do nome com a primeira letra maiuscula.
export function formatarNome(nome) {
  return nome
    .trim()
    .split(" ")
    .map(function (parte) {
      return parte.charAt(0).toUpperCase() + parte.slice(1).toLowerCase();
    })
    .join(" ");
}
