const fs = require("fs");

const digitsEnum = { 0: "o", 1: "i", 3: "e", 4: "a", 5: "s", 7: "t" };

function setBlackListToNDFA(word) {
  const state = {
    state: "q" + (automato.length + ""),
    transition: word,
    isInitial: false,
    isFinal: false,
  };
  return automato.push(state);
}

//substituição de digitos para letras
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

function initAutomato() {
  const state = {
    state: "q" + (automato.length + ""),
    transition: "",
    isInitial: true,
    isFinal: true,
  };

  automato.push(state);
}

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

const rawdata = fs.readFileSync("./blacklist.txt", { encoding: "utf-8" });

const blacklist = rawdata.split("\r\n");

blacklist.forEach((value) => setBlackListToNDFA(value));

const senhasdata = fs.readFileSync("./senhas.txt", { encoding: "utf-8" });

const senhas = senhasdata.split("\r\n");

senhas.forEach((senha) => {
  if (validate(senha.toLowerCase())) {
    console.log("senha valida");
  } else {
    console.log("senha inválida");
  }
});

process.exit();
