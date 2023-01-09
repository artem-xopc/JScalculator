let firstNum = "";
let secondNum = "";
let sign = "";
let finish = false;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const operator = ["+", "-", "/", "*"];

// выводим экран калькулятора
const output = document.querySelector(".input p");

// функция очищения экрана
const clearAll = () => {
  firstNum = "";
  secondNum = "";
  sign = "";
  finish = false;
  output.textContent = 0;
};

document.querySelector(".btn_all").onclick = (event) => {
  if (!event.target.classList.contains("btn")) return; // если нажата не кнопка, то мы обрываем выполнение
  if (event.target.classList.contains("clear")) clearAll(); // если нажата кнопка "С", то мы вызываем функцию clearAll

  output.textContent = "0";

  const key = event.target.textContent;

  if (digit.includes(key)) {
    if (secondNum === "" && sign === "") {
      firstNum += key;
      output.textContent = firstNum;
    } else if (firstNum !== "" && secondNum !== "" && finish) {
        secondNum = key
        finish = false
        output.textContent = secondNum
    } else {
      secondNum += key;
      output.textContent = secondNum;
    }
    console.log(firstNum, secondNum, sign);
    return;
  }

  if (operator.includes(key)) {
    sign = key;
    output.textContent = sign;
    console.log(sign);
    return;
  }

  if (key === "=") {
    if (secondNum === '') secondNum = firstNum
    switch (sign) {
      case "+":
        firstNum = (+firstNum) + (+secondNum);
        break;
      case "-":
        firstNum = firstNum - secondNum;
        break;
      case "*":
        firstNum = firstNum * secondNum;
        break;
      case "/":
        if(secondNum === "0") {
            output.textContent = "Ошибка"
            firstNum = ""
            secondNum = ""
            sign = ""
            return;
        }
        firstNum = firstNum / secondNum;
        break;
    }
    finish = true;
    output.textContent = firstNum
  }
};
