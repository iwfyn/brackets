module.exports = function check(str, bracketsConfig) {
  let openingBrackets = bracketsConfig.map((item, index) => item[0]);
  let closingBrackets = bracketsConfig.map((item, index) => item[1]);
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    // console.log(` Текущий стэк: ${stack}`);
    // console.log(`Кавычка, которую проверяем: ${str[i]}`)
    // console.log(`Выражение в скобках: ${(openingBrackets.includes(str[i]) && !closingBrackets.includes(str[i])) || ((openingBrackets.includes(str[i]) && closingBrackets.includes(str[i])) && !stack.includes(str[i]))}`);
    if ((openingBrackets.includes(str[i]) && !closingBrackets.includes(str[i])) || ((openingBrackets.includes(str[i]) && closingBrackets.includes(str[i])) && !stack.includes(str[i]))) {
      // Если кавычка только открывающая или одинаковая, которая есть и в откр., и в закр. и ее нет еще в стэке, то записываем кавычку в стэк
      // console.log(`Такой кавычки еще нет в стэке, записываем ее в стэк: ${str[i]}`)
      stack.push(str[i]);
    } else {
      // Если встретилась кавычка, которая есть только в закрывающей последовательности или уже есть в стэке (при этом она и откр. и в закр. послед. тоже есть)
      // console.log(`Это закрывающая кавычка или такая, которая уже есть в стэке: ${str[i]}`)
      let bracketFromStack = stack.pop();
      if (bracketFromStack == openingBrackets[closingBrackets.indexOf(str[i])]) {
        // Если кавычка из стэка идентична кавычке, выбранной из массива откр. кавычек по индексу текущей кавычки в массиве закр. кавычек, то просто переходим к след. элементу
        // console.log(`Это кавычка из стэка: ${bracketFromStack} .. Это кавычка из открывающей последовательности, с которой мы сравниваем кавычку из стэка: ${openingBrackets[closingBrackets.indexOf(str[i])]}`)
      } else {
        return false;
      }
    }
  }
  if (stack.length != 0) {
    // Если в стэке остался какой-то элемент (из-за их изначально нечетного количества), то тогда последовательность впринципе не может быть правильной
    return false;
  } else {
    return true;
  }
}