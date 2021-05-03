/**
 * Código para representação do autômato criado no JFLAP
 * O Autômato criado segue o padrão AFN
 * O modelo projeta que todos os estados do autômato partem do estado inicial
 * Todos os estados não-iniciais também não são estados finais
 * Os inputs de testes podem ser incluídos no arquivo senhas.txt
 * As palavras do blacklist estão incluídas no arquivo blacklist.txt
 */

const fs = require("fs");

const digitsEnum = { 0: "o", 1: "i", 3: "e", 4: "a", 5: "s", 7: "t" };

//Função para adicionar a palavra de blacklist como estado ao autômato
//A função recebe um string que dita a regra de transição para o autômato
//A estrutura utiliza state como nome do estado, transition como regra de transição, isInitial para determinar se o estado é inicial e isFinal para determinar se o estado é final
function setBlackListToNDFA(word) {
  const state = {
    state: "q" + (automato.length + ""),
    transition: word,
    isInitial: false,
    isFinal: false,
  };
  return automato.push(state);
}

//Função para substituir os números referentes aos caracteres
//Utiliza o regex /[01357]+/ para selecionar os números que se enquandram no enum digitsEnum
//Para cada match do regex, utiliza-se a função replace do javascript para trocar o numéro pelo caractere do enum
function formatWord(word) {
  const digitMatch = new RegExp(/[013457]+/g);

  if (digitMatch.test(word)) {
    const digits = word.match(digitMatch);

    for (let digit of digits) {
      word = word.replace(digit, digitsEnum[digit]);
    }
  }
  return word;
}

//Função para dar início ao automático quando o código rodar
function initAutomato() {
  const state = {
    state: "q" + (automato.length + ""),
    transition: "",
    isInitial: true,
    isFinal: true,
  };

  automato.push(state);
}

//Função de validação do autômato utilizando a input como para verificar se o mesmo se encontra em uma regra de transição a partir do estado inicial
//Utiliza-se a função find do javascript para encontrar qual o estado inicial do array automato
//Após achar o estado inicial, se utiliza a mesma função para encontrar um dos estados que contenha a palavra em sua regra de transição
//Se encontrado a regra de transição em algum estado, se transfere o estado atual para o estado que contenha a regra de transição
//Após terminado, verifica se o estado atual é estado final para validação.
function validate(word) {
  let currentState = automato.find((state) => state.inital);
  const formatted = formatWord(word);

  automato.find((state, index) => {
    if (
      formatted.includes(state.transition) ||
      word.includes(state.transition)
    ) {
      currentState = automato[index];
    }
  });
  return currentState.isFinal;
}

const automato = [];

initAutomato();

//Função para leitura de palavras que da blacklist
const rawdata = fs.readFileSync("./blacklist.txt", { encoding: "utf-8" });

const blacklist = rawdata.split("\r\n");

blacklist.forEach((value) => setBlackListToNDFA(value));

//Função para leitura de inputs
const senhasdata = fs.readFileSync("./senhas.txt", { encoding: "utf-8" });

const senhas = senhasdata.split("\r\n");

//Validação das senhas incluídas no arquivo senhas.txt
senhas.forEach((senha) => {
  if (validate(senha.toLowerCase())) {
    console.log(
      "senha não contém palavras da blacklist, a senha em questão é",
      senha
    );
  } else {
    console.log(
      "senha contém palavras da blacklist, a senha em questão é",
      senha
    );
  }
});

process.exit();
