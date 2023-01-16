let firstNum = "";
let secondNum = "";
let result = "";
let sign = "";
let finish = false;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const operator = [ "+", "-", "/", "*", "%", "x!", "(", ")", "x^", "lg", "x^2", "ln", "sin", "cos", "tan", "ctg", "+/-", "√x"];

// выводим экран калькулятора
const output = document.querySelector(".input p");
// const history_out = document.querySelector(".history");

// функция очищения экрана
const clearAll = () => {
  firstNum = "";
  secondNum = "";
  sign = "";
  finish = false;
  output.textContent = 0;
  // history_out.textContent = 0;
};

// Функция удаления одного символа из поля output
const backSpace = () => {
  let exp = output.textContent;
  output.textContent = epx.substring(0, exp.length - 1);
};

document.querySelector(".btn_all").onclick = (event) => {
  if (!event.target.classList.contains("btn")) return; // если нажата не кнопка, то мы обрываем выполнение
  if (event.target.classList.contains("clear")) clearAll(); // если нажата кнопка "С", то мы вызываем функцию clearAll

  output.textContent = "0";
  // history_out.textContent = "-"; // Криво работающая история

  const key = event.target.textContent; // Получение значения из массива digit
  var prevKey = key.length - 1;

  // В этом "разделе" описывается логика поведения переменных
  if (digit.includes(key)) {
    if (secondNum === "" && sign === "") {
      if (key === "." && firstNum.includes(".")) {
        firstNum += "";
        output.textContent = firstNum;
      } else {
        firstNum += key;
        output.textContent = firstNum;
      }
    } else if (firstNum !== "" && secondNum !== "" && finish) {
      secondNum = key;
      finish = false;
      output.textContent = secondNum;
    } else if (key === "." && secondNum.includes(".")) {
      secondNum += "";
      output.textContent = secondNum;
    } else {
      secondNum += key;
      output.textContent = secondNum;
    }
    // if (firstNum !== "" || secondNum !== "") {
    //    history_out.textContent = `${firstNum} ` + `${sign} ` + `${secondNum}`;
    // }
    if (firstNum === "" && secondNum !== "") {
      firstNum = secondNum;
      firstNum += key;
      output.textContent = firstNum;
    }
    console.log(firstNum, secondNum, sign);
    return;
  }

  if (operator.includes(key)) {
    sign = key;
    output.textContent = `${firstNum} ` + `${sign} `;
    console.log(sign);
    return;
  }

  const ln = () => {
    if (firstNum <= 0) {
      output.textContent = "Ошибка";
      firstNum = "";
      secondNum = "";
      sign = "";
      return; 
    }
    firstNum = Math.log(firstNum).toFixed(2);
    output.textContent = firstNum;
  }

  // В этом "разделе" описывается логика операторов
  if (key === "=") {
    if (secondNum === "") secondNum = firstNum;
    switch (sign) {
      case "+":
        firstNum = +firstNum + +secondNum;
        output.textContent = firstNum;
        break;
      case "-":
        firstNum = firstNum - secondNum;
        output.textContent = firstNum;
        break;
      case "*":
        firstNum = firstNum * secondNum;
        output.textContent = firstNum;
        break;
      case "/":
        if (secondNum === "0") {
          output.textContent = "Ошибка";
          firstNum = "";
          secondNum = "";
          sign = "";
          return;
        }
        firstNum = firstNum / secondNum;
        output.textContent = firstNum;
        break;
      case "%":
        firstNum = (firstNum * secondNum) / 100;
        output.textContent = firstNum;
        break;
      case "x!":
        console.log("Проверка работоспособности");
        for (i = 1; firstNum > 1; firstNum--) {
          console.log("Входим в цикл");
          i = firstNum * i;
          console.log(i);
          output.textContent = i;
        }
        output.textContent = i;
        break;
      case "x^":
        // firstNum = Math.pow(firstNum, secondNum);
        firstNum = firstNum ** secondNum;
        output.textContent = firstNum;
        break;
      case "x^2":
        firstNum = Math.pow(firstNum, 2);
        output.textContent = firstNum;
        break;
      case "ln":
        if (firstNum <= 0) {
          output.textContent = "Ошибка";
          firstNum = "";
          secondNum = "";
          sign = "";
          return; 
        }
        firstNum = Math.log(firstNum).toFixed(2);
        output.textContent = firstNum;
        break;
      case "lg":
        if (firstNum <= 0) {
          output.textContent = "Ошибка";
          firstNum = "";
          secondNum = "";
          sign = "";
          return; 
        }
        firstNum = Math.log(firstNum) / Math.log(secondNum);
        firstNum = firstNum.toFixed(2);
        output.textContent = firstNum;
        break;
      case "sin":
        firstNum = Math.sin(firstNum);
        output.textContent = firstNum;
        break;
      case "cos":
        firstNum = Math.cos(firstNum);
        output.textContent = firstNum;
        break;
      case "tan":
        firstNum = Math.tan(firstNum);
        output.textContent = firstNum;
        break;
      case "ctg":
        firstNum = 1 / Math.tan(firstNum);
        output.textContent = firstNum;
        break;
      case "√x":
        firstNum = Math.sqrt(firstNum).toFixed(3);
        output.textContent = firstNum;
        break;
    }
    finish = true;
    // history_out.textContent = `${firstNum} ` + `${sign} ` + `${secondNum}`;
  }
};
