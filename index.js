let firstNum = "";
let secondNum = "";
let sign = "";
let finish = false;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const operator = ["+", "-", "/", "*", "%", "x!", '(', ')', 'x^', 'lg'];

// выводим экран калькулятора
const output = document.querySelector(".input p");
const history_out = document.querySelector(".history");

// функция очищения экрана
const clearAll = () => {
  firstNum = "";
  secondNum = "";
  sign = "";
  finish = false;
  output.textContent = 0;
  history_out.textContent = 0;
};

const back = () => {
  let exp = output.textContent;
  output.textContent = epx.substring(0, exp.length - 1);
};

document.querySelector(".btn_all").onclick = (event) => {
  if (!event.target.classList.contains("btn")) return; // если нажата не кнопка, то мы обрываем выполнение
  if (event.target.classList.contains("clear")) clearAll(); // если нажата кнопка "С", то мы вызываем функцию clearAll

  output.textContent = "0";
  history_out.textContent = "-"; // Криво работающая история

  const key = event.target.textContent; // Получение значения из массива digit
  var prevKey = key.length - 1;
  
  // Неудачная попытка создать функцию уменьшения символа (возомжно будет доработана позже)
  const back = prevKey => {
    firstNum = firstNum - prevKey;
    output.textContent = firstNum;
  };

  if (event.target.classList.contains("back")) back(); // если нажата кнопка "С", то мы вызываем функцию clearAll

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
    if (firstNum !== "" || secondNum !== "") {
      history_out.textContent = `${firstNum}` + `${sign}` + `${secondNum}` 
    } 
    if (firstNum === "" && secondNum !== "") {
      firstNum = secondNum
      firstNum += key
      output.textContent = firstNum 
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

  // В этом "разделе" описывается логика операторов
  if (key === "=") {
    if (secondNum === "") secondNum = firstNum;
    switch (sign) {
      case "+":
        firstNum = +firstNum + +secondNum;
        break;
      case "-":
        firstNum = firstNum - secondNum;
        break;
      case "*":
        firstNum = firstNum * secondNum;
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
        break;
      case "%":
        firstNum = (firstNum * secondNum) / 100;
        break;
      case "x!":
        console.log('Проверка работоспособности')
        for (i = 1; i < firstNum; firstNum--) {
          console.log('Входим в цикл')
          firstNum = firstNum * i;
          console.log(firstNum)
          output.textContent = firstNum;
        }
        break;
    }
    finish = true;
    output.textContent = firstNum;
    history_out.textContent = `${firstNum}` + `${sign}` + `${secondNum}`;
  }
};
