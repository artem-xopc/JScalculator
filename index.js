const getHistory = () => {
  return document.getElementById("history__value").innerText;
};

const printHistory = (num) => {
  document.getElementById("history__value").innerText = num;
};

const getOutput = () => {
  return document.getElementById("output__value");
};

const printOutput = (num) => {
  if (num == "") {
    document.getElementById("output__value").innerText = num;
  } else {
    document.getElementById("output__value").innerText = getFormatNum(num);
  }
};

const getFormatNum = (num) => {
  if (num == "_") {
    return "";
  }
  let numb = Number(num);
  let value = numb.toLocaleString("en");
  return value;
};

const reverseNum = (num) => {
  return Number(num.replace(/,/g, ""));
};

const calculatorHistory = () => {
  let operator = document.getElementsByClassName("operator");

  for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function () {
      if (this.id == "clear") {
        printHistory("");
        printOutput("");
      } else if (this.id == "backspace") {
        let output = reverseNum(getOutput()).toString();
        if (output) {
          output = output.substring(0, output.length - 1);
          printOutput(output);
        }
      } else {
        let output = getOutput();
        let history = getHistory();
        if (output == "" && history != "") {
          if (isNaN(history[history.length - 1])) {
            history = history.substring(0, history.length - 1);
          }
        }
        if (output != "" || history != "") {
          output = output == "" ? output : reverseNum(output);
          history = history + output;
          if (this.id == "=") {
            let result = eval(history);
            printOutput(result);
            printHistory("");
          } else {
            history = history + this.id;
            printHistory(history);
            printOutput("");
          }
        }
      }
    });
  }
};

const calculatorNumber = () => {
  let number = document.getElementsByClassName("number");

  for (i = 0; i <= number.length; i++) {
    number[i].addEventListener("click", function () {
      let output = reverseNum(getOutput());
      if (output != NaN) {
        output = output + this.id;
        printOutput(output);
      }
    });
  }
};
