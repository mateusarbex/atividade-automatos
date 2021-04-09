const fs = require("fs");
const readline = require("readline");
//criação da interface de comunicação com input do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//enum para substituição de digitos
const digitsEnum = { 0: "o", 1: "i", 3: "e", 4: "a", 5: "s", 7: "t" };

//regex para encontrar os digitos listados
const digits = new RegExp(/[013457]/g);

//função de substituição de digitos de acordo com o regex
function replaceDigitsToChars(input) {
  let finalInput = input;
  const array = input.match(digits);
  for (let match of array) {
    finalInput = finalInput.replace(match, digitsEnum[match]);
  }
  return finalInput;
}

//leitura de arquivo com as palavras listadas no blacklist
fs.readFile("./blacklist.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) {
    return console.log("não foi possivel ler o arquivo");
  } else {
    //divisão das palavras em um array utilizando os caracteres de return e newline
    const blacklist = data.split("\r\n");

    //prompt de input do usuário
    rl.question("Digite sua senha: \n", (input) => {
      //formatação do input do usuário se caso houver digito ou não ao mesmo tempo que formata todo o input para lower case
      const formatedInput = digits.test(input)
        ? replaceDigitsToChars(input.toLowerCase())
        : input.toLowerCase();
      let isValid = true;

      blacklist.forEach((value) => {
        //verificação se a string contém a substring da blacklist utilizando a função includes
        if (formatedInput.includes(value) || input.includes(value)) {
          return (isValid = false);
        }
      });
      isValid ? console.log("Senha válida") : console.log("Senha inválida");
    });
    return;
  }
});
